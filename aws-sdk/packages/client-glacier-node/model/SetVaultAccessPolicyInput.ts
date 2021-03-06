import {_VaultAccessPolicy} from './_VaultAccessPolicy';
import {Structure as _Structure_} from '@aws-sdk/types';

export const SetVaultAccessPolicyInput: _Structure_ = {
    type: 'structure',
    required: [
        'accountId',
        'vaultName',
    ],
    members: {
        accountId: {
            shape: {
                type: 'string',
            },
            location: 'uri',
            locationName: 'accountId',
        },
        vaultName: {
            shape: {
                type: 'string',
            },
            location: 'uri',
            locationName: 'vaultName',
        },
        policy: {
            shape: _VaultAccessPolicy,
        },
    },
    payload: 'policy',
};