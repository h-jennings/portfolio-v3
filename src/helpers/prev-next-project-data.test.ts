import * as prev_next_project_data from '@/helpers/prev-next-project-data';
// @ponicode
describe('prev_next_project_data.prevNextProjectData', () => {
  test('0', () => {
    let result: any = prev_next_project_data.prevNextProjectData(100);
    expect(result).toEqual([null, null]);
  });

  test('1', () => {
    let result: any = prev_next_project_data.prevNextProjectData(NaN);
    expect(result).toEqual([null, null]);
  });

  test('2', () => {
    let result: any = prev_next_project_data.prevNextProjectData(1);
    let object: any = [
      {
        client: 'Department of Defense',
        path: '/work/dwr',
        project: 'Digital War Room',
        description:
          'A supply chain management application which provided insights and analysis for the U.S. Department of Defense.',
        tags: ['DEVELOPMENT', 'DESIGN SYSTEM'],
      },
      {
        client: 'Personal',
        path: '/work/portfolio-v2',
        project: 'Portfolio V2',
        description:
          "Hunter's previous portfolio of work. Built with TypeScript and React on Next.js",
        tags: ['DEVELOPMENT', 'DESIGN SYSTEM', 'UI DESIGN'],
      },
    ];
    expect(result).toEqual(object);
  });

  test('3', () => {
    let result: any = prev_next_project_data.prevNextProjectData(3);
    let object: any = [
      {
        client: 'Personal',
        path: '/work/portfolio-v2',
        project: 'Portfolio V2',
        description:
          "Hunter's previous portfolio of work. Built with TypeScript and React on Next.js",
        tags: ['DEVELOPMENT', 'DESIGN SYSTEM', 'UI DESIGN'],
      },
      null,
    ];
    expect(result).toEqual(object);
  });

  test('4', () => {
    let result: any = prev_next_project_data.prevNextProjectData(0);
    let object: any = [
      null,
      {
        project: 'National Flood Insurance Program',
        client: 'FEMA',
        path: '/work/nfip',
        description:
          "An expansive suite of microservices for FEMA's National Flood Insurance Program.",
        tags: ['DEVELOPMENT'],
      },
    ];
    expect(result).toEqual(object);
  });
});
