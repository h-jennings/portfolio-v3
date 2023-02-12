import { ds } from '@/styles/ds.css';
import { stack } from '@/styles/primitives/stack.css';
import { pageHeader, text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import React from 'react';
import { BackToLink } from './BackToLink';

export const ProseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className={stack({ gap: 'xl' })} style={{ height: 'min-content' }}>
      {children}
    </article>
  );
};
export const ProseLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>{children}</div>;
};

interface ProseLayoutHeaderProps {
  backTo:
    | {
        hasLink: true;
        href: string;
        content: string;
      }
    | {
        hasLink: false;
      };
  headline?: string;
  description?: string | null;
}

export const ProseLayoutHeader = ({
  backTo = { hasLink: false },
  headline,
  description,
  children,
}: React.PropsWithChildren<ProseLayoutHeaderProps>) => {
  return (
    <div
      className={sprinkles({ paddingBottom: 'xl' })}
      style={{ borderBottom: `1px dashed ${ds.theme.colors.slate8}` }}
    >
      <div>
        {backTo.hasLink ? (
          <BackToLink href={backTo.href}>{backTo.content}</BackToLink>
        ) : null}
        <div className={stack({ gap: 'm' })}>
          {headline != null && <h1 className={pageHeader}>{headline}</h1>}
          {description != null && (
            <p
              className={text({ size: '1', leading: 'body' })}
              style={{ maxWidth: '50ch' }}
            >
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
