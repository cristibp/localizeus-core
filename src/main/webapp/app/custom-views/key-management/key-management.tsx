import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {Table} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntitiesForProject} from 'app/entities/translation-key/translation-key.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';
import { Multiselect } from 'multiselect-react-dropdown';

export interface IKeyManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const KeyManagement = (props: IKeyManagementProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntitiesForProject(props.match.params.id, paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const {translationKeyList, match, loading, totalItems, selectedLanguages, languages} = props;
  return (
    <div>
      <h2 id="translationKey-heading">
        <Translate contentKey="localizeusApp.keyManagement.home.title">List of keys </Translate>
      </h2>
      <div className="table-responsive">

        {translationKeyList && translationKeyList.length > 0 ? (
          <div>
            <div className="table-actions">
              <div className="table-actions-search">
                {/* TODO INTERNATIONALIZE*/}
                <input type="text" placeholder="Search.." name="search"/>
              </div>
              <div>
                <JhiItemCount page={paginationState.activePage} total={totalItems}
                              itemsPerPage={paginationState.itemsPerPage} i18nEnabled/>
                <JhiPagination
                  activePage={paginationState.activePage}
                  onSelect={handlePagination}
                  maxButtons={2}
                  itemsPerPage={paginationState.itemsPerPage}
                  totalItems={props.totalItems}
                />
              </div>
            </div>
            <div className="key-container">
            <Table responsive>
              <thead>
              <tr>
                {/* <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>*/}
                <th className="hand" onClick={sort('value')}>
                  <Translate contentKey="localizeusApp.translationKey.value">Value</Translate> <FontAwesomeIcon
                  icon="sort"/>
                </th>
                <th className="hand" onClick={sort('fallbackValue')}>
                  <Translate contentKey="localizeusApp.translationKey.fallbackValue">Fallback value</Translate>
                  <FontAwesomeIcon
                    icon="sort"/>
                </th>
              </tr>
              </thead>
              <tbody>
              {translationKeyList.map((translationKey, i) => (
                <tr key={`entity-${i}`}>
                  {/* <td>
                  <Button tag={Link} to={`${match.url}/${translationKey.id}`} color="link" size="sm">
                    {translationKey.id}
                  </Button>
                </td>*/}
                  <td>{translationKey.name}</td>
                  <td>{translationKey.fallbackValue}</td>
                </tr>
              ))}
              </tbody>
            </Table>
              {/* <div style={{display: "none"}}>Discussions:</div>*/}
            </div>
            {/* TODO INTERNATIONALIZE*/}here:
            <Multiselect
              options={languages} // Options to display in the dropdown
              selectedValues={selectedLanguages} // Preselected value to persist in dropdown
              onSelect={()=>{}} // Function will trigger on select event
              onRemove={()=>{}} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              showCheckbox={true}
            />

            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">EN</h5>
                  <small>3 days ago</small>
                </div>
                <p className="mb-1">Some placeholder content in a paragraph.</p>
                <small>And some small print.</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">FR</h5>
                  <small className="text-muted">3 days ago</small>
                </div>
                <p className="mb-1">Some placeholder content in a paragraph.</p>
                <small className="text-muted">And some muted small print.</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">List group item heading</h5>
                  <small className="text-muted">3 days ago</small>
                </div>
                <p className="mb-1">Some placeholder content in a paragraph.</p>
                <small className="text-muted">And some muted small print.</small>
              </a>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="localizeusApp.translationKey.home.notFound">No Translations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({translationKey}: IRootState) => ({
  translationKeyList: translationKey.entities,
  loading: translationKey.loading,
  totalItems: translationKey.totalItems,
  selectedLanguages: [],
  /*  TODO ADD real languages available */
  languages: [{name: "ro", id: "1"},{name:"en",id:"1"}]
});

const mapDispatchToProps = {
  getEntitiesForProject,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(KeyManagement);
