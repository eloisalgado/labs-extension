import { DicomMetadataStore } from '@ohif/core';
import { imageLoader } from '@cornerstonejs/core';
import dcmjs from 'dcmjs';
import JSZip from 'jszip'; // skip this line if using CDN

const { datasetToBlob } = dcmjs.data;

function getDcmjsDataset(instance, image) {
  return {
    PatientName: instance.PatientName,
    PatientID: instance.PatientID,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    SOPInstanceUID: instance.SOPInstanceUID,
    SOPClassUID: instance.SOPClassUID,
    Modality: instance.Modality,
    SamplesPerPixel: instance.SamplesPerPixel,
    Rows: instance.Rows,
    Columns: instance.Columns,
    BitsAllocated: instance.BitsAllocated,
    BitsStored: instance.BitsStored,
    HighBit: instance.HighBit,
    PixelRepresentation: instance.PixelRepresentation,
    PhotometricInterpretation: instance.PhotometricInterpretation,
    PixelData: image.getPixelData().buffer,
    _meta: {
      TransferSyntaxUID: {
        Value: [image.transferSyntaxUID],
        vr: 'UI',
      },
    },
    _vrMap: {
      ...instance._vrMap,
    },
  };
}

function fetchImages(studyInstanceUID) {
  // TODO: use Service Workers to fetch images in parallel
  //       and handle large datasets more efficiently
  const study = DicomMetadataStore.getStudy(studyInstanceUID);
  const promises = [];

  study.series.forEach(series => {
    series.instances.forEach(instance => {
      promises.push(
        imageLoader.loadImage(instance.imageId).then(image => getDcmjsDataset(instance, image))
      );
    });
  });

  return promises;
}

async function getZipBlob(dicomBlobs) {
  const zip = new JSZip();

  dicomBlobs.forEach((blob, index) => {
    zip.file(`${index}.dcm`, blob);
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });

  return zipBlob;
}

function getDicomBlobs(imagesDataset) {
  return imagesDataset.map(imageDataset => datasetToBlob(imageDataset));
}

function getZipFileName(studyInstanceUID) {
  return `dicom-${studyInstanceUID}.zip`;
}

function triggerDownload(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

function showNotification(uiNotificationService, { title, message, type = 'info', duration = 0 }) {
  return uiNotificationService.show({
    title,
    message,
    type,
    duration,
  });
}

function showInProgressNotification(uiNotificationService) {
  return showNotification(uiNotificationService, {
    title: 'Downloading DICOM',
    message: 'Fetching image data from server...',
  });
}

function showSuccessNotification(uiNotificationService, studyInstanceUID) {
  return showNotification(uiNotificationService, {
    title: 'Download Complete',
    message: `DICOM data for study ${studyInstanceUID} has been downloaded successfully.`,
    type: 'success',
    duration: 5000,
  });
}

async function downloadDicom({ uiNotificationService }) {
  // For now, only support downloading DICOM data from a single study
  const [studyInstanceUID] = DicomMetadataStore.getStudyInstanceUIDs();
  const imagePromises = fetchImages(studyInstanceUID);

  const notificationId = showInProgressNotification(uiNotificationService);

  const promisesResult = await Promise.allSettled(imagePromises);
  const imagesDataset = promisesResult.filter(p => p.status === 'fulfilled').map(p => p.value);
  const dicomBlobs = getDicomBlobs(imagesDataset);
  const zipBlob = await getZipBlob(dicomBlobs);
  const fileName = getZipFileName(studyInstanceUID);

  triggerDownload(zipBlob, fileName);

  uiNotificationService.hide(notificationId);

  showSuccessNotification(uiNotificationService, studyInstanceUID);
}

export default downloadDicom;
