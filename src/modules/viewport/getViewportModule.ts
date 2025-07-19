import getRtPlanViewport from '../../components/rtPlanViewport';

function getViewportModule() {
  return [
    {
      name: 'rtPlanViewport',
      component: getRtPlanViewport,
    },
  ];
}

export default getViewportModule;
