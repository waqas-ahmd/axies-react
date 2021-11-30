import React from "react";
import * as styles from "./BreedView.module.css";
import { COLORS } from "../assets/colors";
import { iconPath } from "../assets/paths";
import GenesCard from "./GenesCard";

const BreedView = ({ data }) => {
  const ethFactor = 1000000000000000000;
  const getTime = (seconds) => {
    const secs = +seconds;
    const mins = secs / 60;
    if (mins < 60) {
      return `${Math.round(mins)} mins`;
    } else {
      return `${Math.round(mins / 60)} hours`;
    }
  };
  var abilities = [];
  for (let i = 0; i < data.parts.length; i++) {
    for (let j = 0; j < data.parts[i].abilities.length; j++) {
      abilities.push({
        ...data.parts[i].abilities[j],
        partName: data.parts[i].name,
        partClass: data.parts[i].class,
      });
    }
  }

  return (
    <a
      href={`https://marketplace.axieinfinity.com/axie/${data.id}?referrer=axielegend.com`}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.left}>
            <div
              style={{ backgroundColor: COLORS[data.class.toUpperCase()] }}
              className={styles.mainIcon}
            >
              <svg viewBox="0 0 16 16" focusable="false">
                <path fill="#fff" d={iconPath[data.class.toUpperCase()]}></path>
              </svg>
            </div>
            <h4>{data.name}</h4>
          </div>
          <div className={styles.right}>
            <div>{data.breedCount} Breeds</div>
            <div>{data.purity}% Purity</div>
          </div>
        </div>

        <div className={styles.central}>
          <div className={styles.image}>
            <img src={data.image} alt="bad-boy" />
          </div>
          <div className={styles.bars}>
            <div className={styles.row}>
              <div className={styles.icon}>
                <svg viewBox="0 0 16 16">
                  <path
                    fill={COLORS.HEART}
                    d="M8 12.394s-4.98-1.626-4.98-5.152A2.72 2.72 0 018 5.73a2.72 2.72 0 014.98 1.512c0 3.526-4.98 5.152-4.98 5.152"
                  ></path>
                </svg>
              </div>
              <div className={styles.value}>{data.stats.hp}</div>
              <div className={styles.outerBar}>
                <div
                  style={{
                    backgroundColor: COLORS.HEART,
                    width: `${((data.stats.hp - 27) / 33) * 100}%`,
                  }}
                  className={styles.innerBar}
                ></div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.icon}>
                <svg viewBox="0 0 16 16">
                  <path
                    fill={COLORS.LIGHTNING}
                    d="M9.488 6.85h.96c.16 0 .253.184.157.312L6.56 12.666c-.126.159-.381.047-.349-.154l.697-3.96a.195.195 0 00-.194-.23h-.808a.198.198 0 01-.194-.231l.958-5.009a.197.197 0 01.193-.16h3.586c.135 0 .23.134.183.262L9.305 6.581a.197.197 0 00.183.268"
                  ></path>
                </svg>
              </div>
              <div className={styles.value}>{data.stats.speed}</div>
              <div className={styles.outerBar}>
                <div
                  style={{
                    backgroundColor: COLORS.LIGHTNING,
                    width: `${((data.stats.speed - 27) / 33) * 100}%`,
                  }}
                  className={styles.innerBar}
                ></div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.icon}>
                <svg viewBox="0 0 16 16">
                  <path
                    fill={COLORS.STAR}
                    d="M11.374 9.463c-.093.308-.15 3.015-.394 3.205-.246.19-2.677-.59-2.98-.59-.303 0-2.734.78-2.98.59-.245-.19-.302-2.897-.395-3.205-.093-.307-1.54-2.533-1.445-2.84.093-.307 2.488-1.201 2.735-1.39.244-.19 1.782-2.346 2.085-2.346.302 0 1.84 2.155 2.085 2.345.246.19 2.642 1.084 2.735 1.391.095.307-1.352 2.533-1.446 2.84"
                  ></path>
                </svg>
              </div>
              <div className={styles.value}>{data.stats.skill}</div>
              <div className={styles.outerBar}>
                <div
                  style={{
                    backgroundColor: COLORS.STAR,
                    width: `${((data.stats.skill - 27) / 33) * 100}%`,
                  }}
                  className={styles.innerBar}
                ></div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.icon}>
                <svg viewBox="0 0 16 16">
                  <path
                    fill={COLORS.FIRE}
                    d="M11.177 9.139c0 .132-.009.261-.023.39-.176 1.959-1.5 3.263-3.336 3.263-1.781 0-3.017-1.232-3.33-3.106a3.407 3.407 0 01-.046-.547l.012-.229c.043-.771.39-1.577.909-2.087l.363-.358.024.509c.012.236.128.458.337.642.107.094.365.195.676.195.161 0 .314-.028.442-.08a.596.596 0 00.397-.532c.023-.325-.107-.486-.272-.69-.184-.226-.413-.507-.534-1.13-.15-.778.287-1.514 1.23-2.073l.482-.285-.146.54a.995.995 0 00-.032.213c-.02.567.444 1.273 1.417 2.157 1.242 1.13 1.419 2.14 1.423 2.98l.007.228z"
                  ></path>
                </svg>
              </div>
              <div className={styles.value}>{data.stats.morale}</div>
              <div className={styles.outerBar}>
                <div
                  style={{
                    backgroundColor: COLORS.FIRE,
                    width: `${((data.stats.morale - 27) / 33) * 100}%`,
                  }}
                  className={styles.innerBar}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <GenesCard genes={data.genes} />

        <div className={styles.footer}>
          <div className={styles.left}>
            <div className={styles.usd}>${data.auction.currentPriceUSD}</div>

            {(Number(data.auction.currentPrice) / ethFactor).toFixed(3) >
            9999 ? (
              <div className={styles.etherium}>Ξ 9999...</div>
            ) : (
              <div className={styles.etherium}>
                Ξ {(Number(data.auction.currentPrice) / ethFactor).toFixed(3)}
              </div>
            )}
          </div>

          <div className={styles.right}>
            {data.auction.timeLeft === "0" ? (
              <></>
            ) : (
              <>
                <div className={styles.values}>
                  <div className={styles.eth}>
                    Ξ{" "}
                    {(Number(data.auction.startingPrice) / ethFactor).toFixed(
                      3
                    )}
                  </div>
                  <div className={styles.time}>
                    in {getTime(data.auction.timeLeft)}
                  </div>
                  <div className={styles.eth}>
                    Ξ{" "}
                    {(Number(data.auction.endingPrice) / ethFactor).toFixed(3)}
                  </div>
                </div>
                <div className={styles.outerBar}>
                  <div
                    style={{
                      width: `${
                        100 -
                        (Number(data.auction.timeLeft) /
                          (Number(data.auction.endingTimestamp) -
                            Number(data.auction.startingTimestamp))) *
                          100
                      }%`,
                    }}
                    className={styles.innerBar}
                  ></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default BreedView;
