/**
 * 前端路由说明：
 * 基于浏览器 History 的前端 Hash 路由
 */

import React from "react";
import { Route } from "mirrorx";
import {CustomerCorpApply} from "./CustomerCorpApply/container";
import {CustomerPersonApply} from "./CustomerPersonApply/container";
import {CustomerCorpModify} from "./CustomerCorpModify/container";
import {CustomerSource} from "./CustomerSource/container";
import {CustomerPersonModify} from "./CustomerPersonModify/container";

export default () => (

    <div className="route-content">
        <Route exact path="/customerCorp" component={CustomerCorpApply} />
        <Route exact path="/customerPerson" component={CustomerPersonApply} />
        <Route exact path="/customerCorpModify" component={CustomerCorpModify} />
        <Route exact path="/CustomerPersonModify" component={CustomerPersonModify} />
        <Route exact path='/customerSource' component={CustomerSource} />
    </div>

);
