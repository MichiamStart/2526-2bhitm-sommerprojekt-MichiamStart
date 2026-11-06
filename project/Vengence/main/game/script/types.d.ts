interface Point {
  x: number;
  y: number;
}

interface PathNode extends Point {
  g: number;
  h: number;
  f: number;
  parent: PathNode | null;
}

interface Quest extends Point {
  id: string;
  name: string;
  type?: string;
  completed: boolean;
}

interface QuestMarkerData {
  questId: string;
  questName: string;
}

type QuestMarker = Phaser.GameObjects.Image & QuestMarkerData;

interface QuestMarkerGroup extends Phaser.GameObjects.Group {
  getChildren(): QuestMarker[];
}

interface EnemyConfig {
  id: string;
  x: number | string;
  y: number | string;
  type?: string;
  speed?: number | string;
  detectionRadius?: number | string;
  chaseRadius?: number | string;
  attackRadius?: number | string;
  placeholderRadius?: number | string;
  moveTilesMin?: number | string;
  moveTilesMax?: number | string;
  idleSecondsMin?: number | string;
  idleSecondsMax?: number | string;
  removed?: boolean;
}

interface Enemy {
  id: string;
  type: string;
  circle: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  speed: number;
  detectionRadiusTiles: number;
  chaseRadiusTiles: number;
  attackRadiusTiles: number;
  detectionRadiusPx: number;
  chaseRadiusPx: number;
  attackRadiusPx: number;
  moveTilesMin: number;
  moveTilesMax: number;
  idleSecondsMin: number;
  idleSecondsMax: number;
  state: "idle" | "moving" | "chasing";
  path: Point[];
  pathIndex: number;
  nextStateAt: number;
  attackStart: number | null;
  attackDeathTriggered: boolean;
  debugDanger: Phaser.GameObjects.Arc;
  debugChase: Phaser.GameObjects.Arc;
  debugAttack: Phaser.GameObjects.Arc;
}

interface SaveState {
  completedQuestIds: string[];
  removedEnemyIds: string[];
  playerPosition: Point;
}

interface GameScene extends Phaser.Scene {
  walls: Phaser.Tilemaps.TilemapLayer;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  playerStart: Point;
  enemyData: { enemies: EnemyConfig[] };
  enemies: Enemy[];
  map: Phaser.Tilemaps.Tilemap;
  walkableGrid: boolean[][];
  cursors: Record<"up" | "down" | "left" | "right", Phaser.Input.Keyboard.Key>;
  walkSound: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound;
  quests: Quest[];
  questMarkers: QuestMarkerGroup;
  activeQuest: string | null;
  gameStartTime: number;
  finishActive: boolean;
  saveStateEvent: Phaser.Time.TimerEvent;
  abilityCooldown: number;
  abilityCooldownEnd: number;
  abilityUI: {
    fill: Phaser.GameObjects.Rectangle;
    label: Phaser.GameObjects.Text;
    boxX: number;
    boxY: number;
    boxWidth: number;
    boxHeight: number;
  };
  questArrow: Phaser.GameObjects.Triangle;
  gameOverOverlay: Phaser.GameObjects.Container;
  gameOverActive: boolean;
  finishOverlay: Phaser.GameObjects.Container;
  finishTimeText: Phaser.GameObjects.Text;
  coordElement: HTMLElement | null;
}

interface Window {
  game: Phaser.Game;
  restartGame: () => void;
  startGameMusic: () => void;
  gameMusicStarted: () => boolean;
  initializeDebugSpawner?: (scene: GameScene) => void;
}
