package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusApp;
import com.localizeus.core.domain.Language;
import com.localizeus.core.repository.LanguageRepository;
import com.localizeus.core.service.LanguageService;
import com.localizeus.core.service.dto.LanguageDTO;
import com.localizeus.core.service.mapper.LanguageMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LanguageResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LanguageResourceIT {

    private static final String DEFAULT_LANGUAGE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LANGUAGE_NAME = "BBBBBBBBBB";

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private LanguageMapper languageMapper;

    @Autowired
    private LanguageService languageService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLanguageMockMvc;

    private Language language;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Language createEntity(EntityManager em) {
        Language language = new Language()
            .languageName(DEFAULT_LANGUAGE_NAME);
        return language;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Language createUpdatedEntity(EntityManager em) {
        Language language = new Language()
            .languageName(UPDATED_LANGUAGE_NAME);
        return language;
    }

    @BeforeEach
    public void initTest() {
        language = createEntity(em);
    }

    @Test
    @Transactional
    public void createLanguage() throws Exception {
        int databaseSizeBeforeCreate = languageRepository.findAll().size();
        // Create the Language
        LanguageDTO languageDTO = languageMapper.toDto(language);
        restLanguageMockMvc.perform(post("/api/languages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(languageDTO)))
            .andExpect(status().isCreated());

        // Validate the Language in the database
        List<Language> languageList = languageRepository.findAll();
        assertThat(languageList).hasSize(databaseSizeBeforeCreate + 1);
        Language testLanguage = languageList.get(languageList.size() - 1);
        assertThat(testLanguage.getLanguageName()).isEqualTo(DEFAULT_LANGUAGE_NAME);
    }

    @Test
    @Transactional
    public void createLanguageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = languageRepository.findAll().size();

        // Create the Language with an existing ID
        language.setId(1L);
        LanguageDTO languageDTO = languageMapper.toDto(language);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLanguageMockMvc.perform(post("/api/languages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(languageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Language in the database
        List<Language> languageList = languageRepository.findAll();
        assertThat(languageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLanguages() throws Exception {
        // Initialize the database
        languageRepository.saveAndFlush(language);

        // Get all the languageList
        restLanguageMockMvc.perform(get("/api/languages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(language.getId().intValue())))
            .andExpect(jsonPath("$.[*].languageName").value(hasItem(DEFAULT_LANGUAGE_NAME)));
    }
    
    @Test
    @Transactional
    public void getLanguage() throws Exception {
        // Initialize the database
        languageRepository.saveAndFlush(language);

        // Get the language
        restLanguageMockMvc.perform(get("/api/languages/{id}", language.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(language.getId().intValue()))
            .andExpect(jsonPath("$.languageName").value(DEFAULT_LANGUAGE_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingLanguage() throws Exception {
        // Get the language
        restLanguageMockMvc.perform(get("/api/languages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLanguage() throws Exception {
        // Initialize the database
        languageRepository.saveAndFlush(language);

        int databaseSizeBeforeUpdate = languageRepository.findAll().size();

        // Update the language
        Language updatedLanguage = languageRepository.findById(language.getId()).get();
        // Disconnect from session so that the updates on updatedLanguage are not directly saved in db
        em.detach(updatedLanguage);
        updatedLanguage
            .languageName(UPDATED_LANGUAGE_NAME);
        LanguageDTO languageDTO = languageMapper.toDto(updatedLanguage);

        restLanguageMockMvc.perform(put("/api/languages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(languageDTO)))
            .andExpect(status().isOk());

        // Validate the Language in the database
        List<Language> languageList = languageRepository.findAll();
        assertThat(languageList).hasSize(databaseSizeBeforeUpdate);
        Language testLanguage = languageList.get(languageList.size() - 1);
        assertThat(testLanguage.getLanguageName()).isEqualTo(UPDATED_LANGUAGE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingLanguage() throws Exception {
        int databaseSizeBeforeUpdate = languageRepository.findAll().size();

        // Create the Language
        LanguageDTO languageDTO = languageMapper.toDto(language);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLanguageMockMvc.perform(put("/api/languages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(languageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Language in the database
        List<Language> languageList = languageRepository.findAll();
        assertThat(languageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLanguage() throws Exception {
        // Initialize the database
        languageRepository.saveAndFlush(language);

        int databaseSizeBeforeDelete = languageRepository.findAll().size();

        // Delete the language
        restLanguageMockMvc.perform(delete("/api/languages/{id}", language.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Language> languageList = languageRepository.findAll();
        assertThat(languageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
