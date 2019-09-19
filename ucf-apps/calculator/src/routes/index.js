/**
 * 前端路由说明：
 * 基于浏览器 History 的前端 Hash 路由
 */

import React from "react";
import { Route } from "mirrorx";
import { CalculatorNormalzt } from "./calculator-normalzt/container";
import { Calculatorzt } from "./calculator-zt/container";

export default () => (
    <div className="route-content">
        <Route exact path="/" component={CalculatorNormalzt} />
        <Route exact path="/calculator-normalzt" component={CalculatorNormalzt} />
        <Route exact path="/calculator-zt" component={Calculatorzt} />
    </div>
);