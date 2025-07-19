import ImageSet from '@ohif/core/src/classes/ImageSet';
import { utils } from '@ohif/core';
import i18n from '@ohif/i18n';

import { id } from '../../id';

const sopClassUids = ['1.2.840.10008.5.1.4.1.1.481.5'];
const sopClassHandlerName = 'rt-plan-storage';

function getDisplaySetsFromSeries(instances) {
  const instance = instances[0];

  const { wadoRoot, wadoUri, wadoUriRoot } = instance;

  const displaySet = {
    Modality: 'RTPLAN',
    displaySetInstanceUID: utils.guid(),
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    SOPClassUID: instance.SOPClassUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber,
    FrameRate: instance.FrameTime,
    SeriesDescription: instance.SeriesDescription,
    numImageFrames: instances.length,
    isMultiFrame: 'false',
    isReconstructable: false,
    SOPClassHandlerId: `${id}.sopClassHandlerModule.${sopClassHandlerName}`,
    label:
      instance.SeriesDescription ||
      `${i18n.t('Series')} ${instance.SeriesNumber} - ${i18n.t(instance.Modality)}`,
    isLoaded: false,
    loading: false,
    instance,
    wadoRoot,
    wadoUri,
    wadoUriRoot,
    instances: [instances[0]],
  };

  // Note returns an array now
  return [displaySet];
}

function getSopClassHandlerModule() {
  return [
    {
      name: sopClassHandlerName,
      sopClassUids,
      getDisplaySetsFromSeries,
    },
  ];
}

export default getSopClassHandlerModule;
