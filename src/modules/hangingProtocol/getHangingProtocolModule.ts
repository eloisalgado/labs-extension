import ctWithSr from './hps/ctWithSr';
import mrWithSr from './hps/mrWithSr';
import rtPlanHP from './hps/rtPlan';

function getHangingProtocolModule({
  servicesManager,
}: {
  servicesManager: AppTypes.ServicesManager;
}) {
  const { hangingProtocolService } = servicesManager.services;

  hangingProtocolService.addCustomAttribute(
    'samePatientOrientation',
    'samePatientOrientation',
    imageSet => {
      const firstInstance = imageSet.instances?.[0];

      if (firstInstance?.ImageOrientationPatient) {
        const imageOrientationPatient = firstInstance.ImageOrientationPatient.join('');
        return imageSet.instances.every(
          instance => instance.ImageOrientationPatient.join('') === imageOrientationPatient
        );
      }

      return false;
    }
  );

  return [
    {
      name: rtPlanHP.id,
      protocol: rtPlanHP,
    },
    {
      name: ctWithSr.id,
      protocol: ctWithSr,
    },
    {
      name: mrWithSr.id,
      protocol: mrWithSr,
    },
  ];
}

export default getHangingProtocolModule;
