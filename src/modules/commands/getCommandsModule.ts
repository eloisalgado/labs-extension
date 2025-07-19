import downloadDicom from '../../dicom/downloadDicom';
import getLabsInfoModal from '../../components/labsInfoModal';
import getSrInfoModal from '../../components/srInfoModal';

export default function getCommandsModule({
  servicesManager,
}: {
  servicesManager: AppTypes.ServicesManager;
}) {
  const { viewportGridService, uiModalService, displaySetService, uiNotificationService } =
    servicesManager.services;

  const actions = {
    showModalInfo() {
      uiModalService.show({
        title: 'Labs Mode Info',
        content: getLabsInfoModal,
        contentProps: {
          viewportsState: {
            ...viewportGridService.getState(),
          },
          displaySetService,
        },
      });
    },
    showSrInfoModal() {
      uiModalService.show({
        title: 'Structured Report Info',
        content: getSrInfoModal,
        contentProps: {
          viewportGridService,
          displaySetService,
        },
      });
    },
    downloadDicom: () => downloadDicom({ uiNotificationService }),
  };

  const definitions = {
    showLabsModeInfoModal: actions.showModalInfo,
    showSrInfoModal: actions.showSrInfoModal,
    downloadDicom: actions.downloadDicom,
  };

  return {
    actions,
    definitions,
    defaultContext: 'DEFAULT',
  };
}
