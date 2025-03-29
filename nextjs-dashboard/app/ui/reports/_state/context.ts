'use client';

import {getStateContext} from "@/app/ui/reports/_state/state";
import React from "react";

const stateContext = getStateContext();
export const LighthouseReportReactContext = React.createContext(stateContext);
