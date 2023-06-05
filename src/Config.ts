import {
	AzureClientProps,
	AzureLocalConnectionConfig,
	AzureRemoteConnectionConfig,
} from "@fluidframework/azure-client";
import { SharedMap } from "fluid-framework";
import { getRandomName } from "@fluidframework/server-services-client";
import { v4 as uuid } from "uuid";
import { InsecureTokenProvider } from "@fluidframework/test-client-utils";


export const useAzure = true;

export const containerSchema = {
	initialObjects: {
		map: SharedMap,
	},
};

const userConfig = {
	id: uuid(),
	name: getRandomName(),
};

const remoteConnectionConfig: AzureRemoteConnectionConfig = {
	type: "remote",
	tenantId: extractStringEnvVar("REACT_APP_TENANT_ID"), // REPLACE WITH YOUR TENANT ID
	tokenProvider: new InsecureTokenProvider(extractStringEnvVar("REACT_APP_PRIMARY_KEY"), userConfig),
	endpoint: extractStringEnvVar("REACT_APP_SERVICE_ENDPOINT"), // REPLACE WITH YOUR AZURE ENDPOINT
};

const localConnectionConfig: AzureLocalConnectionConfig = {
	type: "local",
	tokenProvider: new InsecureTokenProvider("", userConfig),
	endpoint: "http://localhost:7070",
};

export const connectionConfig: AzureClientProps = {
	connection: useAzure ? remoteConnectionConfig : localConnectionConfig,
};

export function extractStringEnvVar(
    key: keyof NodeJS.ProcessEnv,
): string {
    const value = process.env[key];

    if (value === undefined) {
        const message = `The environment variable "${key}" cannot be "undefined".`;

        throw new Error(message);
    }

    return value;
}
