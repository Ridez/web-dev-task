import { Button, Col, notification, Tooltip } from 'antd';
import React, { useRef } from 'react';
import { Article } from '../../../models/article';
import { useIntersectionObserver } from '../../intersectionObserver';
import './styles.scss';

interface Props {
  article: Article;
}

const openNotification = (msg: string, desc: string = '') => {
  notification.info({
    message: `${msg} clicked!`,
    description: `${desc}`,
    duration: 2,
  });
};

export const ArticleItem: React.FC<Props> = ({ article }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = entry?.isIntersecting;

  return (
    <>
      <Col xs={24} sm={12} lg={8}>
        <article className={isVisible ? 'post-preview inView' : 'post-preview'} ref={ref}>
          <div>
            <figure className='image'>
              <img className='image__content' src={article.image} alt={article.imageAlt} />
              <div className='image__hover image__hover--top'>
                <ul className='btns-list'>
                  <Tooltip title='Vote down'>
                    <li className='btns-list__btn' onClick={() => openNotification('Vote down')}>
                      <img
                        className='thumb-down'
                        src='/assets/images/Smock_ThumbDownOutline_18_N.svg'
                        alt='thumb down icon'
                      />
                    </li>
                  </Tooltip>
                  <Tooltip title='Save for later'>
                    <li
                      className='btns-list__btn'
                      onClick={() => openNotification('Save for later')}
                    >
                      <img
                        className='save'
                        src='/assets/images/icons tag.svg'
                        alt='bookmark icon'
                      />
                    </li>
                  </Tooltip>
                  <Tooltip title='View details'>
                    <li className='btns-list__btn' onClick={() => openNotification('View details')}>
                      <img
                        className='details'
                        src='/assets/images/svgexport-15.svg'
                        alt='details icon'
                      />
                    </li>
                  </Tooltip>
                </ul>
              </div>
              <div className='image__hover image__hover--center'>
                <Button
                  type='primary'
                  className='image__btn'
                  onClick={() =>
                    openNotification('Schedule', `Post now article. Url: ${article.url}`)
                  }
                >
                  Post now
                </Button>
              </div>
            </figure>

            <a className='source-box' href={article.domain} target='_blank' rel='noreferrer'>
              <img src={article.favicon} alt='source logo' />
              <p>{article.sourceTitle}</p>
            </a>

            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        </article>
      </Col>
    </>
  );
};
