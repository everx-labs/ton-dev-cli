/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at: https://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
 *
 */

const qClientScheme = {
    "data": {
        "__schema": {
            "types": [
                {
                    "kind": "OBJECT",
                    "name": "Query",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MessageFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "StringFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "SCALAR",
                    "name": "String",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MessageHeaderFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MessageHeaderIntMsgInfoFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BooleanFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "SCALAR",
                    "name": "Boolean",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MsgAddressIntFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "NoneFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MsgAddressIntAddrStdFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MsgAddressIntAddrStdAnycastFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "IntFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "SCALAR",
                    "name": "Int",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MsgAddressIntAddrVarFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MsgAddressIntAddrVarAnycastFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "CurrencyCollectionFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MessageHeaderExtInMsgInfoFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MsgAddressExtFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MsgAddressExtAddrExternFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MessageHeaderExtOutMsgInfoFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MessageInitFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TickTockFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "QueryOrderBy",
                    "possibleTypes": null
                },
                {
                    "kind": "ENUM",
                    "name": "QueryOrderByDirection",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "Message",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "MessageHeader",
                    "possibleTypes": [
                        {
                            "name": "MessageHeaderIntMsgInfoVariant"
                        },
                        {
                            "name": "MessageHeaderExtInMsgInfoVariant"
                        },
                        {
                            "name": "MessageHeaderExtOutMsgInfoVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "MessageHeaderIntMsgInfoVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MessageHeaderIntMsgInfo",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "MsgAddressInt",
                    "possibleTypes": [
                        {
                            "name": "MsgAddressIntAddrNoneVariant"
                        },
                        {
                            "name": "MsgAddressIntAddrStdVariant"
                        },
                        {
                            "name": "MsgAddressIntAddrVarVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressIntAddrNoneVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "None",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressIntAddrStdVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressIntAddrStd",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressIntAddrStdAnycast",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressIntAddrVarVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressIntAddrVar",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressIntAddrVarAnycast",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "CurrencyCollection",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MessageHeaderExtInMsgInfoVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MessageHeaderExtInMsgInfo",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "MsgAddressExt",
                    "possibleTypes": [
                        {
                            "name": "MsgAddressExtAddrNoneVariant"
                        },
                        {
                            "name": "MsgAddressExtAddrExternVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressExtAddrNoneVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressExtAddrExternVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgAddressExtAddrExtern",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MessageHeaderExtOutMsgInfoVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MessageHeaderExtOutMsgInfo",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MessageInit",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TickTock",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockInfoFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockInfoPrevRefFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockInfoPrevRefPrevFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockInfoShardFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockInfoMasterRefFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "ExtBlkRefFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockInfoPrevVertRefFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockValueFlowFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockExtraFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "InMsgArrayFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "InMsgFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "InMsgExternalFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "InMsgIHRFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "InMsgImmediatellyFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MsgEnvelopeFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "IntermediateAddressFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "IntermediateAddressRegularFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "IntermediateAddressSimpleFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "IntermediateAddressExtFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "InMsgFinalFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "InMsgTransitFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "InMsgDiscardedFinalFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "InMsgDiscardedTransitFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "OutMsgArrayFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "OutMsgFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "OutMsgExternalFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "OutMsgImmediatelyFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "OutMsgOutMsgNewFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "OutMsgTransitFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "OutMsgDequeueFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "OutMsgTransitRequiredFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockExtraAccountBlocksArrayFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockExtraAccountBlocksFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "StringArrayFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockExtraAccountBlocksStateUpdateFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "BlockStateUpdateFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "Block",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockInfo",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockInfoPrevRef",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockInfoPrevRefPrev",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockInfoShard",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockInfoMasterRef",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "ExtBlkRef",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockInfoPrevVertRef",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockValueFlow",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockExtra",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "InMsg",
                    "possibleTypes": [
                        {
                            "name": "InMsgExternalVariant"
                        },
                        {
                            "name": "InMsgIHRVariant"
                        },
                        {
                            "name": "InMsgImmediatellyVariant"
                        },
                        {
                            "name": "InMsgFinalVariant"
                        },
                        {
                            "name": "InMsgTransitVariant"
                        },
                        {
                            "name": "InMsgDiscardedFinalVariant"
                        },
                        {
                            "name": "InMsgDiscardedTransitVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgExternalVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgExternal",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgIHRVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgIHR",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgImmediatellyVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgImmediatelly",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "MsgEnvelope",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "IntermediateAddress",
                    "possibleTypes": [
                        {
                            "name": "IntermediateAddressRegularVariant"
                        },
                        {
                            "name": "IntermediateAddressSimpleVariant"
                        },
                        {
                            "name": "IntermediateAddressExtVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "IntermediateAddressRegularVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "IntermediateAddressRegular",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "IntermediateAddressSimpleVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "IntermediateAddressSimple",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "IntermediateAddressExtVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "IntermediateAddressExt",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgFinalVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgFinal",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgTransitVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgTransit",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgDiscardedFinalVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgDiscardedFinal",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgDiscardedTransitVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "InMsgDiscardedTransit",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "OutMsg",
                    "possibleTypes": [
                        {
                            "name": "OutMsgNoneVariant"
                        },
                        {
                            "name": "OutMsgExternalVariant"
                        },
                        {
                            "name": "OutMsgImmediatelyVariant"
                        },
                        {
                            "name": "OutMsgOutMsgNewVariant"
                        },
                        {
                            "name": "OutMsgTransitVariant"
                        },
                        {
                            "name": "OutMsgDequeueVariant"
                        },
                        {
                            "name": "OutMsgTransitRequiredVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgNoneVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgExternalVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgExternal",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgImmediatelyVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgImmediately",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgOutMsgNewVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgOutMsgNew",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgTransitVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgTransit",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgDequeueVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgDequeue",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgTransitRequiredVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "OutMsgTransitRequired",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockExtraAccountBlocks",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockExtraAccountBlocksStateUpdate",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "BlockStateUpdate",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountStorageStatFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountStorageFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountStorageStateFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountStorageStateAccountActiveFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "Account",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "AccountStorageStat",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "AccountStorage",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "AccountStorageState",
                    "possibleTypes": [
                        {
                            "name": "AccountStorageStateAccountUninitVariant"
                        },
                        {
                            "name": "AccountStorageStateAccountActiveVariant"
                        },
                        {
                            "name": "AccountStorageStateAccountFrozenVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "AccountStorageStateAccountUninitVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "AccountStorageStateAccountActiveVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "AccountStorageStateAccountActive",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "AccountStorageStateAccountFrozenVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TransactionFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "MessageArrayFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TransactionStateUpdateFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TransactionDescriptionFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TransactionDescriptionOrdinaryFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TrStoragePhaseFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TrCreditPhaseFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TrComputePhaseFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TrComputePhaseSkippedFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TrComputePhaseVmFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TrActionPhaseFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "StorageUsedShortFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TrBouncePhaseFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TrBouncePhaseNofundsFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TrBouncePhaseOkFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TransactionDescriptionTickTockFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TransactionDescriptionSplitPrepareFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "SplitMergeInfoFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TransactionDescriptionSplitInstallFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TransactionDescriptionMergePrepareFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "TransactionDescriptionMergeInstallFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "Transaction",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionStateUpdate",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "TransactionDescription",
                    "possibleTypes": [
                        {
                            "name": "TransactionDescriptionOrdinaryVariant"
                        },
                        {
                            "name": "TransactionDescriptionStorageVariant"
                        },
                        {
                            "name": "TransactionDescriptionTickTockVariant"
                        },
                        {
                            "name": "TransactionDescriptionSplitPrepareVariant"
                        },
                        {
                            "name": "TransactionDescriptionSplitInstallVariant"
                        },
                        {
                            "name": "TransactionDescriptionMergePrepareVariant"
                        },
                        {
                            "name": "TransactionDescriptionMergeInstallVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionOrdinaryVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionOrdinary",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrStoragePhase",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrCreditPhase",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "TrComputePhase",
                    "possibleTypes": [
                        {
                            "name": "TrComputePhaseSkippedVariant"
                        },
                        {
                            "name": "TrComputePhaseVmVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "TrComputePhaseSkippedVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrComputePhaseSkipped",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrComputePhaseVmVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrComputePhaseVm",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrActionPhase",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "StorageUsedShort",
                    "possibleTypes": null
                },
                {
                    "kind": "UNION",
                    "name": "TrBouncePhase",
                    "possibleTypes": [
                        {
                            "name": "TrBouncePhaseNegfundsVariant"
                        },
                        {
                            "name": "TrBouncePhaseNofundsVariant"
                        },
                        {
                            "name": "TrBouncePhaseOkVariant"
                        }
                    ]
                },
                {
                    "kind": "OBJECT",
                    "name": "TrBouncePhaseNegfundsVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrBouncePhaseNofundsVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrBouncePhaseNofunds",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrBouncePhaseOkVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TrBouncePhaseOk",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionStorageVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionTickTockVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionTickTock",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionSplitPrepareVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionSplitPrepare",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "SplitMergeInfo",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionSplitInstallVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionSplitInstall",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionMergePrepareVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionMergePrepare",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionMergeInstallVariant",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "TransactionDescriptionMergeInstall",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "Subscription",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "__Schema",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "__Type",
                    "possibleTypes": null
                },
                {
                    "kind": "ENUM",
                    "name": "__TypeKind",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "__Field",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "__InputValue",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "__EnumValue",
                    "possibleTypes": null
                },
                {
                    "kind": "OBJECT",
                    "name": "__Directive",
                    "possibleTypes": null
                },
                {
                    "kind": "ENUM",
                    "name": "__DirectiveLocation",
                    "possibleTypes": null
                },
                {
                    "kind": "INPUT_OBJECT",
                    "name": "FloatFilter",
                    "possibleTypes": null
                },
                {
                    "kind": "SCALAR",
                    "name": "Float",
                    "possibleTypes": null
                },
                {
                    "kind": "ENUM",
                    "name": "CacheControlScope",
                    "possibleTypes": null
                },
                {
                    "kind": "SCALAR",
                    "name": "Upload",
                    "possibleTypes": null
                }
            ]
        }
    }
};

export {qClientScheme};
