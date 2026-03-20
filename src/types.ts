/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Point {
  x: number;
  y: number;
}

export interface Particle {
  id: number;
  pos: Point;
  vel: Point;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  windows: boolean[][];
}

export interface Destruction {
  pos: Point;
  radius: number;
}

export type ProjectileType = 'normal' | 'giant' | 'acid';

export interface Treasure {
  id: number;
  pos: Point;
  type: 'giant' | 'acid';
  active: boolean;
}

export interface GameState {
  player1Pos: Point;
  player2Pos: Point;
  sunPos: Point;
  sunState: 'normal' | 'surprised';
  buildings: Building[];
  destructions: Destruction[];
  particles: Particle[];
  shake: number;
  currentPlayer: 1 | 2;
  wind: number;
  scores: [number, number];
  playerNames: [string, string];
  gravity: number;
  status: 'aiming' | 'throwing' | 'exploding' | 'celebrating' | 'roundOver' | 'tournamentOver';
  winner?: number;
  tournamentWinner?: number;
  roundCount: number;
  throwStartTime?: number;
  dragStart: Point | null;
  dragCurrent: Point | null;
  treasures: Treasure[];
  player1Projectile: ProjectileType;
  player2Projectile: ProjectileType;
  banana?: {
    pos: Point;
    vel: Point;
    trail: Point[];
    angle: number;
    type: ProjectileType;
  };
  explosion?: {
    pos: Point;
    radius: number;
    maxRadius: number;
    type: ProjectileType;
  };
}

export const GRAVITY = 0.25;
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const MONKEY_SIZE = 24;
