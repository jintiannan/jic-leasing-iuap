/**
 * 前端路由说明：
 * 基于浏览器 History 的前端 Hash 路由
 */

import React from "react";
import { Route } from "mirrorx";
import { ConnectedCover } from "./cover/container";
import { ConnectedMessage } from "./message/container";


export default () => (
    <div className="route-content">
        <Route exact path="/" component={ConnectedCover} />
        <Route exact path="/cover" component={ConnectedCover} />
        <Route exact path="/message" component={ConnectedMessage} />
    </div>
);