import { css } from 'ds/css';
import { stack } from 'ds/patterns';
import * as React from 'react';
import Balancer from 'react-wrap-balancer';
import { BackToLink } from './back-to-link';

export const ProseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article
      className={stack({
        gap: 'xl',
        h: 'min-content',
        align: 'flex-start',
        w: 'full',
      })}
    >
      {children}
    </article>
  );
};

export const ProseLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={css({ overflow: 'hidden' })}>{children}</div>;
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
      className={css({
        pb: 'xl',
        borderBottom: '1px dashed',
        borderColor: 'slate8',
        w: 'full',
      })}
    >
      <div>
        {backTo.hasLink ? (
          <BackToLink href={backTo.href}>{backTo.content}</BackToLink>
        ) : null}
        <div className={stack({ gap: 'm', align: 'flex-start' })}>
          {headline != null && (
            <h1 className={css({ textStyle: 'heading' })}>
              <Balancer>{headline}</Balancer>
            </h1>
          )}
          {description != null && (
            <p
              className={css({
                textStyle: 'base',
                fontSize: '1',
                lineHeight: 'body',
                maxWidth: '50ch',
              })}
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
