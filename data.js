const cases = [
    {
        id: "case1",
        title: "제1화: 미란다 원칙의 부재",
        description: "당신은 국선 변호인입니다. 피고인 김철수는 절도 혐의로 체포되었습니다. 경찰은 그가 현장에서 도주하려 했다고 주장합니다. 하지만 김철수는 체포 당시 경찰로부터 아무런 고지도 받지 못했다고 합니다.",
        initialNode: "start",
        nodes: {
            "start": {
                text: "접견실에서 김철수를 만났습니다. 그는 억울함을 호소하고 있습니다.\n\n김철수: '변호사님, 저는 그냥 길을 가고 있었는데 갑자기 경찰이 와서 수갑을 채웠어요. 왜 잡아가냐고 물어도 대답도 안 해줬습니다.'\n\n당신은 무엇을 확인해야 할까요?",
                choices: [
                    {
                        text: "체포 당시 미란다 원칙(범죄사실의 요지, 체포의 이유, 변호인을 선임할 권리, 변명할 기회)을 고지받았는지 묻는다.",
                        nextNode: "check_miranda",
                        healthChange: 0
                    },
                    {
                        text: "일단 혐의를 인정하고 선처를 구하자고 설득한다.",
                        nextNode: "bad_advice_1",
                        healthChange: -30
                    }
                ]
            },
            "check_miranda": {
                text: "김철수: '아니요, 그런 말은 전혀 없었어요. 그냥 다짜고짜 수갑부터 채우고 차에 태웠습니다. 경찰서에 도착해서야 조사를 받으면서 절도 혐의라고 들었어요.'\n\n경찰의 체포 과정에 중대한 절차적 하자가 있어 보입니다. 어떻게 대응하시겠습니까?",
                choices: [
                    {
                        text: "체포 절차의 위법성을 주장하며 구속적부심사를 청구하거나 공판에서 위법수집증거 배제를 주장한다.",
                        nextNode: "legal_action",
                        healthChange: 0
                    },
                    {
                        text: "경찰에게 가서 따진다.",
                        nextNode: "emotional_action",
                        healthChange: -10
                    }
                ]
            },
            "bad_advice_1": {
                text: "김철수는 당신의 말에 실망한 표정입니다.\n\n김철수: '저는 정말 안 훔쳤어요! 제 말은 안 믿어주시는 겁니까?'\n\n신뢰도가 하락했습니다.",
                choices: [
                    {
                        text: "다시 상황을 파악하기 위해 체포 당시 상황을 묻는다.",
                        nextNode: "check_miranda",
                        healthChange: 0
                    }
                ]
            },
            "emotional_action": {
                text: "경찰서에 찾아가 항의했지만, 담당 형사는 '적법한 절차였다'고 주장하며 당신을 무시합니다. 기록을 남기지 않은 항의는 효과가 없습니다.",
                choices: [
                    {
                        text: "정식으로 법적 절차를 밟는다.",
                        nextNode: "legal_action",
                        healthChange: 0
                    }
                ]
            },
            "legal_action": {
                text: "법정입니다. 검사는 피고인이 현행범이었으며 도주 우려가 있었다고 주장합니다. 당신의 변론 차례입니다.",
                choices: [
                    {
                        text: "형사소송법 제200조의5(체포와 피의사실 등의 고지) 위반을 근거로 체포의 위법성을 주장한다.",
                        nextNode: "victory",
                        healthChange: 0
                    },
                    {
                        text: "피고인이 반성하고 있다고 주장한다.",
                        nextNode: "defeat",
                        healthChange: -50
                    }
                ]
            },
            "victory": {
                text: "판사: '피고인에 대한 체포는 적법한 절차를 따르지 않았으므로 위법합니다. 따라서 이 체포에 기해 수집된 증거들은 위법수집증거로서 증거능력이 없습니다.'\n\n무죄(공소기각 또는 무죄) 판결을 이끌어냈습니다! 승리!",
                choices: [],
                isEnding: true,
                isWin: true
            },
            "defeat": {
                text: "판사: '피고인의 혐의가 인정됩니다...'\n\n절차적 하자를 다투지 못해 유죄 판결이 나왔습니다. 패배...",
                choices: [],
                isEnding: true,
                isWin: false
            }
        }
    },
    {
        id: "case2",
        title: "제2화: 독수독과 (위법수집증거)",
        description: "피고인 이영희는 마약 소지 혐의로 기소되었습니다. 경찰은 이영희의 집을 수색하여 마약을 발견했습니다. 하지만 수색 당시 영장이 없었습니다.",
        initialNode: "start",
        nodes: {
            "start": {
                text: "이영희: '변호사님, 경찰들이 갑자기 문을 따고 들어와서 집을 뒤졌어요. 영장 같은 건 보여주지도 않았고요.'\n\n경찰은 '긴급한 상황이었다'고 주장합니다. 기록을 보니 사후 영장도 청구하지 않았습니다.",
                choices: [
                    {
                        text: "영장주의 위반을 주장하며 압수된 마약의 증거능력을 부인한다.",
                        nextNode: "argue_warrant",
                        healthChange: 0
                    },
                    {
                        text: "마약이 발견된 것은 사실이니 자백하고 선처를 구한다.",
                        nextNode: "confess",
                        healthChange: -40
                    }
                ]
            },
            "confess": {
                text: "이영희: '억울해요! 절차를 지키지 않은 건 경찰인데 왜 제가 피해를 봐야 하죠?'\n\n의뢰인의 신뢰가 크게 떨어졌습니다.",
                choices: [
                    {
                        text: "다시 전략을 수정하여 위법수집증거 배제 법칙을 주장한다.",
                        nextNode: "argue_warrant",
                        healthChange: 0
                    }
                ]
            },
            "argue_warrant": {
                text: "법정에서 당신은 헌법 제12조 제3항(영장주의)과 형사소송법 제308조의2(위법수집증거의 배제)를 근거로 변론합니다.\n\n검사: '비록 영장은 없었지만, 실체적 진실 발견이 중요합니다. 마약은 명백한 증거입니다.'",
                choices: [
                    {
                        text: "위법한 절차로 수집된 증거는 유죄의 증거로 삼을 수 없다는 '위법수집증거 배제 법칙'을 강력히 주장한다.",
                        nextNode: "victory",
                        healthChange: 0
                    },
                    {
                        text: "검사의 말에 동의하며 증거능력을 인정한다.",
                        nextNode: "defeat",
                        healthChange: -100
                    }
                ]
            },
            "victory": {
                text: "판사: '수사기관의 절차적 위법이 중대하여, 이를 유죄의 증거로 삼는 것은 헌법상 적법절차의 원칙에 반합니다. 압수된 마약은 증거로 쓸 수 없습니다.'\n\n증거불충분으로 무죄 판결을 받아냈습니다!",
                choices: [],
                isEnding: true,
                isWin: true
            },
            "defeat": {
                text: "판사: '변호인이 증거능력을 인정하였으므로 유죄로 인정합니다.'\n\n치명적인 실수로 패소했습니다.",
                choices: [],
                isEnding: true,
                isWin: false
            }
        }
    }
];
