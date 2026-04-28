/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Re-export shim — 真正的型別與常數已搬到 src/game/{types,constants}.ts。
 * 這個檔案只為了不破壞既有 `from './types'` 的 import path。
 * 新程式碼請直接 from './game/types' / './game/constants'。
 */

export type {
  Point,
  ParticleType,
  Particle,
  Building,
  Destruction,
  ProjectileType,
  Treasure,
  Meteor,
  MeteorShower,
  GameState,
} from './game/types';

export {
  GRAVITY,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  MONKEY_SIZE,
} from './game/constants';
