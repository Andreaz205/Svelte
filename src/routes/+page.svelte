<script>
    let isFirstInfoCellHovered = false
    const setFirstHovered = () => isFirstInfoCellHovered = true
    const setFirstNotHovered = () => isFirstInfoCellHovered = false

    let isSecondInfoCellHovered = false
    const setSecondHovered = () => isSecondInfoCellHovered = true
    const setSecondNotHovered = () => isSecondInfoCellHovered = false

    let isThirdInfoCellHovered = false
    const setThirdHovered = () => isThirdInfoCellHovered = true
    const setThirdNotHovered = () => isThirdInfoCellHovered = false

    let isForthInfoCellHovered = false
    const setForthHovered = () => isForthInfoCellHovered = true
    const setForthNotHovered = () => isForthInfoCellHovered = false

    let isFifthInfoCellHovered = false
    const setFifthHovered = () => isFifthInfoCellHovered = true
    const setFifthNotHovered = () => isFifthInfoCellHovered = false

    let activeItem = null
    const setActiveItem = (item) => {
        if (activeItem && activeItem === item) return activeItem = null
        activeItem = item
    }
    export let data;

</script>

<section>
    <div class="wrapper">
        <div class="container">
            <div class="left-days">
                <span>Пн</span>
                <span>Ср</span>
                <span>Пт</span>
            </div>
            <div class="chart">

                {#each data.weeks as item}
                    <div class="column">
                        {#each item.elements as day}
                            {#if day.month}
                                <div class="month">
                                    <span>{day.month}</span>
                                </div>
                            {/if}

                            <div class='{
                                day.status === "first" ? "firstStage"
                                    : day.status === "second" ? "secondStage"
                                        : day.status === "third" ? "thirdStage"
                                            : day.status === "forth" ? "forthStage"
                                                : "fifthStage"
                                } cell {activeItem === day.item && "active"}'
                                 on:click={(e) => setActiveItem(day.item)}
                            >
                                <div class='comment-wrapper {activeItem === day.item ? "": "hidden"}'>
                                    <div class="comment-bubble-second">
                                        <div>
                                            <div>
                                                {day.count} contributions
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                {day.labelBottomData}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/each}

            </div>

            <div class="info">
                <span>Меньше</span>
                <div class="info-cells">
                    <div class="cell firstStage"
                         on:mouseenter={() => setFirstHovered()}
                         on:mouseleave={() => setFirstNotHovered()}
                    >
                        <div class="comment-wrapper {isFirstInfoCellHovered ? '' : 'hidden'}">
                            <div
                                    class="comment-bubble-first"
                            >
                                <span>
                                    0 contributions
                                </span>
                            </div>
                        </div>

                    </div>

                    <div class="cell secondStage"
                         on:mouseenter={() => setSecondHovered()}
                         on:mouseleave={() => setSecondNotHovered()}
                    >
                        <div class="comment-wrapper {isSecondInfoCellHovered ? '' : 'hidden'}">
                            <div class="comment-bubble-first"
                            >
                                <span>
                                    1+ contributions
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="cell thirdStage"
                         on:mouseenter={() => setThirdHovered()}
                         on:mouseleave={() => setThirdNotHovered()}
                    >
                        <div class="comment-wrapper {isThirdInfoCellHovered ? '' : 'hidden'}">
                            <div
                                    class="comment-bubble-first"
                            >
                                <span>
                                          10+ contributions
                                </span>

                            </div>
                        </div>

                    </div>
                    <div class="cell forthStage"
                         on:mouseenter={() => setForthHovered()}
                         on:mouseleave={() => setForthNotHovered()}
                    >
                        <div class="comment-wrapper {isForthInfoCellHovered ? '' : 'hidden'}">
                            <div
                                    class="comment-bubble-first"
                            ><span>
                                20+ contributions
                            </span></div>
                        </div>
                    </div>
                    <div class="cell fifthStage"
                         on:mouseenter={() => setFifthHovered()}
                         on:mouseleave={() => setFifthNotHovered()}
                    >
                        <div class="comment-wrapper {isFifthInfoCellHovered ? '' : 'hidden'}">
                            <div
                                    class="comment-bubble-first"
                            >
                                <span>30+ contributions</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span>Больше</span>
            </div>

        </div>
    </div>

</section>

<style lang="scss">
  * {
    box-sizing: border-box;
    padding: 0;
  }
  .hidden {
    display: none;
  }
  .comment-wrapper{
    z-index: 100;
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translate(-50%, -100%);
  }
  .comment-bubble-first {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 32px;
    background: #000000;
    position: relative;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;
    border-radius: 12px;
  }

  .comment-bubble-first >span {
    text-align: center;
    position: absolute;
    width: 102px;
    height: 15px;

    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    /* identical to box height */


    color: #FFFFFF;

  }

  .comment-bubble-second {
    width: 145px;
    height: 42px;
    background: #000000;
    position: relative;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;
    border-radius: 12px;
  }

  .comment-bubble-second >div {
    padding-top: 4px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .comment-bubble-second >div:nth-child(2) {
    padding-top: 17px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .comment-bubble-second >div:first-child >div {
    text-align: center;
    position: absolute;
    width: 102px;
    height: 15px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #FFFFFF;
  }

  .comment-bubble-second >div:nth-child(2) >div {
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #7C7C7C;
  }


  .comment-bubble-first:before {
       content: "";
       width: 0;
       height: 0;
       right: 50%;
       bottom: 0;
       transform: translate(50%, 100%);
       position: absolute;
       border-top: 10px solid #000000;
       border-right: 4px solid transparent;
       border-left: 4px solid transparent;
     }
  .comment-bubble-second:before {
    content: "";
    width: 0;
    height: 0;
    right: 50%;
    bottom: 0;
    transform: translate(50%, 100%);
    position: absolute;
    border-top: 10px solid #000000;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }

  .active {
    outline: 1px solid black;
  }
  section {
    width: 100%;
  }
  .wrapper {
    display: flex;
    justify-content: center;
  }
    .container {
      white-space: nowrap;
        margin: 55px 20px;
        position: relative;
        width: 867px;
        height: 167px;
    }

    .left-days {
      position: absolute;
      left: -6px;
      top: 20px;
      transform: translateX(-100%);
      width: 17px;
      height: 81px;

      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }

  .left-days >span {
    color: #959494;
    font-family: Inter,sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0em;
    text-align: center;
  }

    .chart {

        padding-top: 20px;
        height: 137px;
    }
    .column {
      position: relative;
        display: inline-block;
        white-space: nowrap;
        max-height: 117px;
        width: 15px;
        margin-right: 2px;
    }
    .column:last-child {
      margin-right: 0;
    }

    .month {
      position: absolute;
      top: -5px;
      transform: translateY(-100%);
    }

    .month >span {
      font-family: Inter, sans-serif;
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
      text-align: left;
      height: 15px;
      width: 26.00082015991211px;
      left: 132.9720458984375px;
      top: 55px;
      color: #959494;
    }

    .cell {
      position: relative;
      height: 15px;
      width: 15px;
      margin-bottom: 2px;
      background-color: #EDEDED;
    }


    .cell:hover {
      outline: 1px solid rgba(0, 0, 0, 0.5);
    }

    .firstStage {

    }

    .secondStage {
        background-color: #ACD5F2;
    }

    .thirdStage {
        background-color: #7FA8C9;
    }

    .forthStage {
        background-color: #527BA0;

    }

    .fifthStage {
        background-color: #254E77;

    }

    .info {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 167px;
    }

    .info .info-cells {
      display: flex;
      justify-content: center;
    }

    .info .info-cells .cell {
      margin-top: 0;
      margin-right: 2px;
    }


    .info >span {
      font-weight: 400;
      font-size: 8px;
      line-height: 9.68px;
      font-family: Inter,serif;
      color: #959494;
    }

  .info .cell:hover{
    outline: none;
  }
    .cell:last-child {
      margin-bottom: 0;
    }

</style>

