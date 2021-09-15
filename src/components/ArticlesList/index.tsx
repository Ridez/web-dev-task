import { notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { EmployeeBranding, TodaysPicks } from '../../data/articles';
import { Article } from '../../models/article';
import { ArticleItem } from './ArticleItem';
import './styles.scss';

const openNotification = (msg: string, desc: string = '') => {
  notification.info({
    message: `${msg} clicked!`,
    description: `${desc}`,
    duration: 2,
  });
};

export const ArticlesList: React.FC = () => {
  const [todaysPicks, setTodaysPicks] = useState<Article[]>([]);
  const [employeeBranding, setEmployeeBranding] = useState<Article[]>([]);

  const [todaysPicksLoading, setTodaysPicksLoading] = useState<boolean>(true);
  const [employeeBrandingLoading, setEmployeeBrandingLoading] = useState<boolean>(true);

  useEffect(() => {
    setTodaysPicks(TodaysPicks);
    setEmployeeBranding(EmployeeBranding);
    setTodaysPicksLoading(false);
    setEmployeeBrandingLoading(false);
  }, []);

  return (
    <>
      {!todaysPicksLoading && (
        <section className='todays-picks'>
          <h2 className='section-title'>Today's Picks</h2>
          <Row gutter={[24, 86]}>
            {todaysPicks.map((article, articleIdx) => (
              <ArticleItem key={articleIdx} article={article} />
            ))}
          </Row>
        </section>
      )}

      {!employeeBrandingLoading && (
        <section className='employee-branding'>
          <div className='box'>
            <div className='left'>
              <div className='icon'>
                <img src='/assets/images/icons tag.svg' alt='tag icon' />
              </div>
              <h2 className='section-title'>Employee Branding</h2>
            </div>
            <div className='right'>
              <button
                className='see-more'
                onClick={() => openNotification('See more', `Router link.`)}
              >
                See more
              </button>
            </div>
          </div>

          <Row gutter={[24, 86]}>
            {employeeBranding.map((article, articleIdx) => (
              <ArticleItem key={articleIdx} article={article} />
            ))}
          </Row>
        </section>
      )}
    </>
  );
};
