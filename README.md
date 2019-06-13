# Installation

npm i -s @abhishekover9000/vuegen

# Usage

# NOTE- YOU MUST CALL THIS FROM THE .SRC DIRECTORY LEVEL

## CONFIGURING FOR APP

* It is recommended to do this for generating components across the app to DRY up future scaffolding

vuegen -0 or vuegen --config

## SCAFFOLDING A COMPONENT/ UNIT TEST

vuegen -s [NAME] or --scaffold [NAME]

## CREATING A COMPONENT

vuegen -c [NAME] or --component [NAME]

## CREATE A UNIT TEST

vuegen -u [NAME] OR --unit [NAME]

## NEXT STEPS

* Adding more unit test library options beyond mocha/chai
* Adding support for vuex store creation similar to rails g model

## SCAFFOLDING A VUEX/VUE CRUD APP READY TO CONSUME AN API FROM A DESIGN SCHEMA (FUTURE)
