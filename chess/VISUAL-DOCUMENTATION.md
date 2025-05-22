# Chess Simulator Visual Documentation

## Game Board Layout

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Deep Blue (White)                                          │
│  ● ○                                                        │
│  Captured:                                                  │
│  ♟ ♟ ♟  ♜ ♜  ♝ ♝  ♞ ♞  ♛                                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜   │                                 │    │
│  │ ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟   │                                 │    │
│  │                   │                                 │    │
│  │                   │                                 │    │
│  │                   │                                 │    │
│  │                   │                                 │    │
│  │ ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙   │                                 │    │
│  │ ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖   │                                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Stockfish (Black)                                          │
│  ● ○                                                        │
│  Captured:                                                  │
│  ♙ ♙ ♙  ♖ ♖  ♗ ♗  ♘ ♘  ♕                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│ ChessBoard                                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────────────┐  ┌─────────────┐  │
│  │ PlayerColumn│  │        Grid         │  │ PlayerColumn│  │
│  │             │  │                     │  │             │  │
│  │ ┌─────────┐ │  │  ┌───────────────┐  │  │ ┌─────────┐ │  │
│  │ │PlayerInfo│ │  │  │    Square     │  │  │ │PlayerInfo│ │  │
│  │ └─────────┘ │  │  │               │  │  │ └─────────┘ │  │
│  │             │  │  │  ┌─────────┐  │  │  │             │  │
│  │ ┌─────────┐ │  │  │  │ChessPiece│  │  │  │ ┌─────────┐ │  │
│  │ │Captured │ │  │  │  └─────────┘  │  │  │ │Captured │ │  │
│  │ │  Pieces │ │  │  └───────────────┘  │  │ │  Pieces │ │  │
│  │ └─────────┘ │  │                     │  │ └─────────┘ │  │
│  └─────────────┘  └─────────────────────┘  └─────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Visual States

### Current Player Indicator
```
┌─────────────────┐
│ Deep Blue       │
│ ● ○             │  ● = Pulsing dot
└─────────────────┘  ○ = Thinking animation
```

### Winner Banner
```
┌─────────────────────────────────────────┐
│                                         │
│             Deep Blue Wins!             │
│                                         │
└─────────────────────────────────────────┘
     *   *   *   *   *   *   *   *   *
      *   *   *   *   *   *   *   *   *
```

### Captured Pieces Display
```
┌─────────┐
│ ♟ ♟ ♟   │
│ ♜ ♜     │
│ ♝ ♝     │
│ ♞ ♞     │
│ ♛       │
└─────────┘
```

## Color Scheme

```
Board Colors:
Light Square: #eeeed2
Dark Square:  #769656

Piece Colors:
White Pieces: #ffffff (with black shadow)
Black Pieces: #000000 (with white shadow)

UI Elements:
Current Player: #4CAF50 (green)
Background:    #ffffff (white)
Text:          #000000 (black)
```

## Responsive Layout

```
Desktop (>1200px):
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Player Info] [Board (600px)] [Player Info]                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Tablet (768px-1200px):
┌─────────────────────────────────────────────┐
│                                             │
│  [Player Info]                              │
│  [Board (500px)]                            │
│  [Player Info]                              │
│                                             │
└─────────────────────────────────────────────┘

Mobile (<768px):
┌─────────────────────────────┐
│                             │
│  [Player Info]              │
│  [Board (300px)]            │
│  [Player Info]              │
│                             │
└─────────────────────────────┘
```

## Animation States

### Piece Movement
```
Start Position    →    End Position
┌─────────┐           ┌─────────┐
│   ♔     │           │         │
└─────────┘           └─────────┘
      ↓
┌─────────┐
│   ♔     │  (Smooth transition)
└─────────┘
```

### Current Player Indicator
```
Pulsing Dot:
● → ○ → ● → ○  (1.5s cycle)

Thinking Animation:
○ → ◎ → ○ → ◎  (1s cycle)
```

## Game Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Game Start │────▶│ Player Turn │────▶│ Move Made   │
└─────────────┘     └─────────────┘     └─────────────┘
                          │                   │
                          ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Game Over  │◀────│ Check State │◀────│ Update Board│
└─────────────┘     └─────────────┘     └─────────────┘
```

## Error States

```
Invalid Move:
┌─────────────────────────┐
│                         │
│     Invalid Move!       │
│                         │
└─────────────────────────┘

Connection Error:
┌─────────────────────────┐
│                         │
│  Connection Lost...     │
│  Reconnecting...        │
│                         │
└─────────────────────────┘
``` 