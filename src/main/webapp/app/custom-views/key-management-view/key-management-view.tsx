import React, {useEffect, useState} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Table} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, log, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';
import {Multiselect} from 'multiselect-react-dropdown';
import {getEntitiesForProject} from "app/custom-views/key-management-view/key-management-view.reducer";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {getEntities} from "app/entities/language/language.reducer";
import ArrayHelper from "app/shared/util/array-utils";
import StorageHelper from "app/shared/util/storage/custom-storage-utils";

export interface IKeyManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}


const LANGUAGES_BUCKET = "selectedLanguages";
export const KeyManagementView = (props: IKeyManagementProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const [translations, setTranslations] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [localTranslations, setLocalTranslations] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [searchTranslationKeyTerm, setSearchTranslationKeyTerm] = useState('');

  const {
    keyManagementViewList,
    match,
    loading,
    totalItems,
    allLanguages
  } = props;

  const getAllEntities = () => {
    props.getEntitiesForProject(props.match.params.id, paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const getAllLanguages = () => {
    props.getEntities();
  }

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  function showTranslationsByDefaultForFirstKey() {
    log("selectedLanguages1", selectedLanguages);
    log("keyManagementViewList", keyManagementViewList);
    if (keyManagementViewList && keyManagementViewList.length > 0) {
      const translationKey = keyManagementViewList[0];
      const translationsForLanguage = translationKey.translations.filter(
        translation => selectedLanguages.some(selectedLanguage => translation.languageId === selectedLanguage.id)
      );
      setTranslations(translationsForLanguage);
      setLocalTranslations(keyManagementViewList[0].translations);
    }
  }

  const allLanguagesToMultiselectLanguages = () => {
    return allLanguages
      .map(language => ({
        languageName: language.languageName,
        id: language.id
      }));
  }

  function setDefaultLanguageSelection() {
    const lsItems = StorageHelper.getLSItems(LANGUAGES_BUCKET);
    if (lsItems) {
      setSelectedLanguages(lsItems )
    } else {
      setSelectedLanguages(allLanguagesToMultiselectLanguages());
    }
  }

  useEffect(() => {
    getAllLanguages();
    setDefaultLanguageSelection();

    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    showTranslationsByDefaultForFirstKey()
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
  }, [props.location.search, selectedLanguages, props.keyManagementViewList]);

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

  const onSelectLanguageEvent = (selectedList, selectedItem) => {
    selectedLanguages.push(selectedItem);
    StorageHelper.syncStateToLS(selectedLanguages, LANGUAGES_BUCKET);

    log("selected", selectedItem);
    setTranslations(localTranslations.filter(translation => {
      return selectedLanguages.some(language => translation.languageId === language.id)
    }));
    log("localTranslations", ArrayHelper.toString(localTranslations));
    log("translations", ArrayHelper.toString(translations));

  }

  const onRemoveLanguageEvent = (selectedList, selectedItem) => {
    ArrayHelper.removeOne(selectedLanguages, language => language.id === selectedItem.id);
    StorageHelper.syncStateToLS(selectedLanguages, LANGUAGES_BUCKET);
    log("selectedAtRemove", selectedItem);
    log("translations", ArrayHelper.toString(translations));

    setTranslations(localTranslations.filter(translation =>
      selectedLanguages.some(language => translation.languageId === language.id)));

    log("localTranslations", ArrayHelper.toString(localTranslations));
    log("translations", ArrayHelper.toString(translations));

  }

  const showTranslations = (translationKeyId: number, i: React.MouseEvent<HTMLTableRowElement>, rowNumber: number) => {
    setSelectedRow(rowNumber);
    if (keyManagementViewList && keyManagementViewList.length > 0) {
      const translationKey = keyManagementViewList.find(x => x.translationKey.id === translationKeyId);
      const translationsForLanguage = translationKey.translations.filter(
        translation => selectedLanguages.some(selectedLanguage => translation.languageId === selectedLanguage.id)
      );
      setTranslations(translationsForLanguage);

      log("translationsForLanguage-show", ArrayHelper.toString(translationsForLanguage));
      setLocalTranslations(translationsForLanguage);
    }
  }

  function searchTranslations(e: React.ChangeEvent<HTMLInputElement>) {
    const keyword = e.target.value;
    setSearchTranslationKeyTerm(keyword);
  }

  return (
    <div>
      <h2 id="translationKey-heading">
        <Translate contentKey="localizeusApp.keyManagement.home.title">List of keys </Translate>
      </h2>
      <div className="table-responsive">
        {keyManagementViewList && keyManagementViewList.length > 0 ? (
          <div>
            <div className="table-actions">
              <div className="table-actions-left">
                <div className="table-actions-search">
                  {/* TODO INTERNATIONALIZE*/}
                  <input type="text" onChange={e => searchTranslations(e)} className="search"
                         placeholder="Search for a specific key.." name="search"/>
                </div>
                <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity"
                      id="jh-create-entity">
                  <FontAwesomeIcon icon="plus"/>
                  &nbsp;
                  <Translate contentKey="localizeusApp.translationKey.home.createLabel">Create new Translation
                    Key</Translate>
                </Link>
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
                <tr className="no-hover">
                  <th className="hand" onClick={sort('name')}>
                    <Translate contentKey="localizeusApp.translationKey.name">Name</Translate> <FontAwesomeIcon
                    icon="sort"/>
                  </th>
                  <th className="hand" onClick={sort('fallbackValue')}>
                    <Translate contentKey="localizeusApp.translationKey.fallbackValue">Fallback value</Translate>
                    <FontAwesomeIcon
                      icon="sort"/>
                  </th>
                  <th>
                    Labels
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody>
                {keyManagementViewList.filter(keyManagementView => searchTranslationKeyTerm !== '' && keyManagementView.translationKey.name.startsWith(searchTranslationKeyTerm) ||
                  searchTranslationKeyTerm === '')
                  .map((keyManagementView, i) => (
                    <tr className={selectedRow === i ? 'hand rowSelected' : 'hand'} key={`entity-${i}`}
                        onClick={(event) => showTranslations(keyManagementView.translationKey.id, event, i)}>
                      <td>{keyManagementView.translationKey.name}</td>
                      <td>{keyManagementView.translationKey.fallbackValue}</td>
                      <td>{keyManagementView.labels && keyManagementView.labels.length > 0 ?
                        keyManagementView.labels.map((label, l) => (
                          <span className="badge badge-light label-badges" key={`label-${l}`}>{label.value}</span>
                        )) : ""}
                      </td>
                      <td>
                        <Button
                          tag={Link}
                          to={`${/translation-key/}${keyManagementView.translationKey.id}/delete`}
                          color="danger"
                          size="sm"
                        >
                          <FontAwesomeIcon icon="trash"/>{' '}
                          <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* <div style={{display: "none"}}>Discussions:</div>*/}
            </div>
          </div>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="localizeusApp.translationKey.home.notFound">No Translations found</Translate>
            </div>
          ))
        }
      </div>
      {/* https://www.npmjs.com/package/multiselect-react-dropdown */}
      <Multiselect
        options={allLanguagesToMultiselectLanguages()} // Options to display in the dropdown
        selectedValues={selectedLanguages} // Preselected value to persist in dropdown
        onSelect={(selectedList, selectedItem) => onSelectLanguageEvent(selectedList, selectedItem)} // Function will trigger on select event
        onRemove={(selectedList, selectedItem) => onRemoveLanguageEvent(selectedList, selectedItem)} // Function will trigger on remove event
        displayValue="languageName" // Property name to display in the dropdown options
        // TODO i18n
        placeholder="Pick one or more languages"
        // TODO i18n
        emptyRecordMsg="No options available"
        closeOnSelect={false}
        showCheckbox={true}
        avoidHighlightFirstOption={true}
      />
      <br/>
      {translations && translations.length > 0 ? (
        <div className="translations-container">
          <div className="list-group">
            {translations.map((translation, i) => (
              <a href="#" className="list-group-item list-group-item-action" aria-current="true" key={i}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{allLanguages.find(x => x.id === translation.languageId).languageName}</h5>
                  <small>3 days ago</small>
                </div>
                <p className="mb-1">{translation.value}</p>
                <small>And some small print.</small>
              </a>
            ))}
          </div>
        </div>
      ) : ''}
    </div>
  );
};

const mapStateToProps = ({keyManagementView, language}: IRootState) => ({
  keyManagementViewList: keyManagementView.entities,
  allLanguages: language.entities,
  loading: keyManagementView.loading,
  totalItems: keyManagementView.totalItems,
  translationBucket: keyManagementView.translations
});

const mapDispatchToProps = {
  getEntitiesForProject,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(KeyManagementView);
