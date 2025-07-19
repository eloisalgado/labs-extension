const rtPlanHP = {
  id: 'rtPlanHp',
  locked: true,
  name: 'RT Plan Hanging Protocol',
  createdDate: '2025-07-15T10:50:23.619Z',
  modifiedDate: null,
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [
    {
      weight: 10,
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: ['CT'],
      },
      required: true,
    },
  ],
  toolGroupIds: ['default'],
  numberOfPriorsReferenced: 0,
  displaySetSelectors: {
    trPlanDisplaySet: {
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'Modality',
          constraint: {
            equals: { value: 'RTPLAN' },
          },
          required: true,
        },
      ],
    },
    ctDisplaySet: {
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'Modality',
          constraint: {
            equals: { value: 'CT' },
          },
          required: true,
        },
        {
          weight: 1,
          attribute: 'isReconstructable',
          constraint: {
            equals: {
              value: true,
            },
          },
          required: true,
        },
      ],
    },
  },
  stages: [
    {
      name: 'RT Plan Stage',
      viewportStructure: {
        layoutType: 'grid',
        properties: {
          rows: 1,
          columns: 2,
        },
      },
      viewports: [
        {
          viewportOptions: {
            viewportType: 'stack',
            viewportId: 'trPlanViewport',
          },
          displaySets: [
            {
              id: 'trPlanDisplaySet',
            },
          ],
        },
        {
          viewportOptions: {
            viewportType: 'volume',
            orientation: 'coronal',
            viewportId: 'ctViewport',
          },
          displaySets: [
            {
              id: 'ctDisplaySet',
            },
          ],
        },
      ],
      createdDate: '2025-07-15T10:50:23.619Z',
    },
  ],
};

export default rtPlanHP;
