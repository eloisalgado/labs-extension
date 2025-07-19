const mrWithSr = {
  id: 'mrWithSrHp',
  locked: true,
  name: 'MR with SR Hanging Protocol',
  createdDate: '2025-07-15T19:22:40.867Z',
  modifiedDate: null,
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [
    {
      weight: 15,
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: ['MR', 'SR'],
      },
      required: true,
    },
  ],
  toolGroupIds: ['default'],
  numberOfPriorsReferenced: 0,
  displaySetSelectors: {
    mrDisplaySet: {
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'Modality',
          constraint: {
            equals: { value: 'MR' },
          },
          required: true,
        },
      ],
    },
    srDisplaySet: {
      seriesMatchingRules: [
        {
          weight: 1,
          attribute: 'Modality',
          constraint: {
            equals: { value: 'SR' },
          },
          required: true,
        },
      ],
    },
  },
  stages: [
    {
      name: 'MR and SR Stage',
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
            viewportId: 'mrViewport',
          },
          displaySets: [
            {
              id: 'mrDisplaySet',
            },
          ],
        },
        {
          viewportOptions: {
            viewportType: 'dicom-sr',
            viewportId: 'srViewport',
          },
          displaySets: [
            {
              id: 'srDisplaySet',
            },
          ],
        },
      ],
      createdDate: '2025-07-15T19:22:40.867Z',
    },
  ],
};

export default mrWithSr;
