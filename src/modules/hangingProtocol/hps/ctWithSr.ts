const ctWithSr = {
  id: 'ctWithSrHp',
  locked: true,
  name: 'CT with SR Hanging Protocol',
  createdDate: '2025-07-15T19:22:40.867Z',
  modifiedDate: null,
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [
    {
      weight: 15,
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: ['CT', 'SR'],
      },
      required: true,
    },
  ],
  toolGroupIds: ['default'],
  numberOfPriorsReferenced: 0,
  displaySetSelectors: {
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
          attribute: 'samePatientOrientation',
          constraint: {
            equals: { value: true },
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
      name: 'Same Orientation CT and SR Stage',
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
            viewportId: 'ctViewport',
          },
          displaySets: [
            {
              id: 'ctDisplaySet',
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

export default ctWithSr;
