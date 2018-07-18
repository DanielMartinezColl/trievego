package com.edu.um.programacion2.cucumber.stepdefs;

import com.edu.um.programacion2.TrievegoApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = TrievegoApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
