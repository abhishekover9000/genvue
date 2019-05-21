# Unit Testing

## General Repetitive Boilerplate Candidates

Study of our unit test to observe repetitions that are viable candidates for generator refactoring

### Imports

import { createLocalVue, shallowMount } from '@vue/test-utils'

import VueRouter from 'vue-router'

import ${Component} from ${Component_Directory}

import { expect } from 'chai'

import router from '@/router'

### Global Variables

const localVue = createLocalVue()

localVue.use(VueRouter)

### Describe blocks

describe(${Component_Name}, () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(${Component}, {
            router,
            localVue,
        })
    })

    it('Renders the component', () => {
        expect(wrapper.html()).not.to.equal(undefined)
    })

})

## Feature Specific Boilerplate Candidates

### Store Vuex

import Vuex from 'vuex'

localVue.use(Vuex)

in describe block beforeEach adds an empty store component

```
const store = new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    }
})
```

## Invokable

### Vuegen

Configure app
Where do components go
Where do pages go
Where do unit tests go

Persists in a .vuegen file in repository?

### Vuegen config

Sets .vuegen file object?

### Vuegen scaffold

Makes component / page with respective unit test

### Vuegen component

### Vuegen Unit

Invokes the unit test menu

i.e. vuegen unit -c UserForm -p '@/components/UserForm' -n 'User Form' -n 'User Form' -s 'MC' -f 'standard'

Whats the component? (flag --component or -c)

Where is it located? (flag --path or -p)

What's the component name? (flag --name or -n)

What test suite are you using? (flag --suite or -s)

* Mocha & Chai (MC)

What Features are you testing? (flag --features)

* standard (Vue and Vue Router)
* store (includes Store boilerplate)

Standard Questions?
Where is router located? Defaults to "@/router"

(if store)
Where is store located? Defaults to "@/store"

### Vuegen Unit Function
