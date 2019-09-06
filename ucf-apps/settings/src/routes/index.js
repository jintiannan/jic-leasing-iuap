/**
 * 前端路由说明：
 * 基于浏览器 History 的前端 Hash 路由
 */

import React from "react";
import { Route } from "mirrorx";
import {Role} from "./role/container";
import {Menu} from "./menu/container";

export default () => (

    <div className="route-content">
        <Route exact path="/role" component={Role} />
        <Route exact path="/menu" component={Menu} />
    </div>

);
