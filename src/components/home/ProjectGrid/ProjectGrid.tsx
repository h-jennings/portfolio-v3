import { useGetProjectsQuery } from '@/graphql/generated/types.generated';
import * as sc from '@/styles/elements/scrollContainer.css';
import { ProjectCard } from '@components/common/ProjectCard';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import * as s from './ProjectGrid.css';

export const ProjectGrid = ({ count }: { count: number }): JSX.Element => {
  const [{ data }] = useGetProjectsQuery({ variables: { count } });
  const { projects } = data ?? {};

  return (
    <ScrollAreaPrimitive.Root className={sc.scrollContainer.area}>
      <ScrollAreaPrimitive.Scrollbar
        className={sc.scrollContainer.scrollBar}
        orientation='horizontal'
      >
        <ScrollAreaPrimitive.Thumb className={sc.scrollContainer.scrollThumb} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Viewport className={sc.scrollContainer.viewPort}>
        <div className={clsx(s.cardContainer)}>
          {projects?.map((project) => (
            <div key={project.id} className={s.cardWrapper}>
              <ProjectCard
                project={project}
                sizes='(max-width: 590px) 90vw, (max-width: 767px) 45vw, 220px'
              />
            </div>
          ))}
        </div>
      </ScrollAreaPrimitive.Viewport>
    </ScrollAreaPrimitive.Root>
  );
};
