import { app } from 'electron';
import * as fs from 'fs';

app.getPath('userData');

export interface Workspace {
    path: string;
    open?: boolean;
}

const path: string = app.getPath('userData') + '/plm.json';

let configuration: { workspace: Workspace[] } = {
    workspace: [],
};

// TODO : Check error ?
function saveConfiguration() {
    fs.writeFileSync(path, JSON.stringify(configuration));
}

function register_new_workspace(workspace: Workspace) {
    configuration.workspace.push(workspace);
    saveConfiguration();
}

function init() {
    if (fs.existsSync(path)) {
        configuration = JSON.parse(fs.readFileSync(path, 'utf8'));
    } else {
        saveConfiguration();
    }
}

function get_open_workspace(): Workspace[] {
    return configuration.workspace.filter((workspace) => workspace.open);
}

function get_recent_workspace(): Workspace[] {
    return configuration.workspace;
}

export default {
    init,
    get_open_workspace,
    get_recent_workspace,
    register_new_workspace,
};
