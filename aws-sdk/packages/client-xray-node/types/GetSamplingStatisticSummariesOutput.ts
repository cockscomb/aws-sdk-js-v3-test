import {_UnmarshalledSamplingStatisticSummary} from './_SamplingStatisticSummary';
import * as __aws_sdk_types from '@aws-sdk/types';

/**
 * GetSamplingStatisticSummariesOutput shape
 */
export interface GetSamplingStatisticSummariesOutput {
    /**
     * _SamplingStatisticSummaryList shape
     */
    SamplingStatisticSummaries?: Array<_UnmarshalledSamplingStatisticSummary>;

    /**
     * _String shape
     */
    NextToken?: string;

    /**
     * Metadata about the response received, including the HTTP status code, HTTP headers, and any request identifiers recognized by the SDK.
     */
    $metadata: __aws_sdk_types.ResponseMetadata;
}
