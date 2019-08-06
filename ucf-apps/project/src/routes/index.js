/**
 * 前端路由说明：
 * 基于浏览器 History 的前端 Hash 路由
 */

import React from "react";
import { Route } from "mirrorx";
import { ConnectedProjectApproval } from "./project-approval/container";
import { ConnectedProjectInfo } from "./project-info/container";

export default () => (
    <div className="route-content">
        <Route exact path="/" component={ConnectedProjectApproval} />
        <Route exact path="/project-approval" component={ConnectedProjectApproval} />
        <Route exact path="/project-info" component={ConnectedProjectInfo} />
    </div>
);