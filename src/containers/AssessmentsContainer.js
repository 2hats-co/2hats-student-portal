import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
import LoadingScreen from '../components/LoadingScreen';
import Assessment from '../components/Assessment';

import AssessmentsIcon from '@material-ui/icons/AssignmentOutlined';

import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards, getCardsWidth } from '../components/Cards';
import Announcement from '../components/Announcement';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocumentFromUrl from '../hooks/useDocumentFromUrl';
import { firestore } from '../store';
import * as ROUTES from '../constants/routes';

const AssessmentsContainer = props => {
  const { isMobile, location, history, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  const setAssessmentPathBySkill = async skill => {
    console.log(COLLECTIONS);
    const yourQuery = await firestore
      .collection(COLLECTIONS.users)
      .doc(user.id)
      .collection(COLLECTIONS.assessments)
      .where('skillAssociated', '==', skill)
      .get();

    if (!yourQuery.empty) {
      history.push(
        `${ROUTES.ASSESSMENTS}?id=${yourQuery.docs[0].id}&yours=true`
      );
      return;
    }

    const query = await firestore
      .collection(COLLECTIONS.assessments)
      .where('skillAssociated', '==', skill)
      .get();

    if (!query.empty)
      history.push(`${ROUTES.ASSESSMENTS}?id=${query.docs[0].id}`);
    // docDispatch({
    //   path: `${COLLECTIONS.assessments}/${query.docs[0].id}`,
    //   valid: true,
    // });
  };
  const [
    docState,
    // docDispatch
  ] = useDocumentFromUrl(location, COLLECTIONS.assessments);

  useEffect(() => {
    document.title = '2hats – Assessments';
  }, []);

  useEffect(
    () => {
      const parsedQuery = queryString.parse(location.search);
      if (parsedQuery.skill) {
        setAssessmentPathBySkill(parsedQuery.skill);
      }
    },
    [location]
  );

  useEffect(
    () => {
      if (docState.doc)
        document.title = `2hats – Assessments – ${docState.doc.title}`;
      else document.title = '2hats – Assessments';
    },
    [docState.doc]
  );

  const parsedQuery = queryString.parse(location.search);
  if (parsedQuery.id && parsedQuery.id.length > 0) {
    if (docState.doc && docState.doc.id === parsedQuery.id)
      return <Assessment data={docState.doc} />;
    return <LoadingScreen showNav />;
  }
  if (parsedQuery.skill && parsedQuery.skill.length > 0) {
    if (docState.doc) return <Assessment data={docState.doc} />;
    return <LoadingScreen showNav />;
  }

  return (
    <div>
      <ContainerHeader
        title="Assessments"
        isMobile={isMobile}
        maxWidth={getCardsWidth(cardsCols)}
        icon={<AssessmentsIcon />}
      />
      <Announcement width={getCardsWidth(cardsCols)} />
      <Cards
        title="Your Submissions"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
          limit: cardsCols,
          sort: { field: 'updatedAt', direction: 'desc' },
        }}
        extra
      />
      <Cards
        title="Marketing Assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.assessments,
          limit: cardsCols,
          filters: [
            { field: 'category', operator: '==', value: 'marketing' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        }}
        filterIds={user.touchedAssessments}
        NoneLeftIcon={AssessmentsIcon}
        noneLeftMsg="There are no more marketing assessements available at the moment"
        extra
      />
      <Cards
        title="Sales Assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.assessments,
          limit: cardsCols,
          filters: [
            { field: 'category', operator: '==', value: 'sales' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        }}
        filterIds={user.touchedAssessments}
        NoneLeftIcon={AssessmentsIcon}
        noneLeftMsg="There are no more sales assessments available at the moment"
        extra
      />
      <Cards
        title="Tech Assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.assessments,
          limit: cardsCols,
          filters: [
            { field: 'category', operator: '==', value: 'tech' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        }}
        filterIds={user.touchedAssessments}
        NoneLeftIcon={AssessmentsIcon}
        noneLeftMsg="There are no more tech assessments available at the moment"
        extra
      />
    </div>
  );
};

AssessmentsContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(AssessmentsContainer);
