# Tic Tac Toe AI Tutorial
A comprehensive guide to understanding and learning from our AI Tic Tac Toe implementations

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [AI Types and Strategies](#ai-types-and-strategies)
4. [Learning Process](#learning-process)
5. [Tournament System](#tournament-system)
6. [Advanced Concepts](#advanced-concepts)
7. [Practical Exercises](#practical-exercises)
8. [Troubleshooting](#troubleshooting)
9. [Integrating with a Backend API](#integrating-with-a-backend-api)

## Introduction

### What is This Tutorial?
This tutorial explains how different AI strategies work in Tic Tac Toe, from simple rule-based approaches to complex neural network learning systems. You'll learn how these AIs think, learn, and improve over time.

### Prerequisites
- Basic understanding of Tic Tac Toe rules
- Familiarity with Lisp programming (helpful but not required)
- Interest in AI and machine learning concepts

### System Requirements
- SBCL (Steel Bank Common Lisp)
- The tutorial code files
- A text editor or IDE

## Getting Started

### Installation
1. Clone the repository
2. Ensure all required files are present:
   - tictactoe-nn-ai.lisp
   - scoreboard.lisp
   - ai_memories.lisp
   - player-config.lisp
   - tournament-players.lisp

### Running Your First Game
```lisp
(load "tictactoe-nn-ai.lisp")
(run-tournament)
```

## AI Types and Strategies

### 1. Rule-Based AI (RB)
The simplest and most reliable AI that follows explicit rules:

#### Strategy Steps
1. Check for winning moves
2. Block opponent's winning moves
3. Take center if available
4. Take corners if available
5. Take any available edge

#### Characteristics
- Deterministic strategy
- No learning or adaptation
- Perfect for teaching basic Tic Tac Toe strategy
- Always makes optimal moves
- Best for beginners to learn against

#### Example
```lisp
(defun rule-based-ai-move (board player)
  (let ((opponent (if (eq player 'X) 'O 'X)))
    ;; 1. Win if possible
    (let ((win-move (find-winning-move board player)))
      (when win-move (return-from rule-based-ai-move win-move)))
    ;; 2. Block opponent's win
    (let ((block-move (find-winning-move board opponent)))
      (when block-move (return-from rule-based-ai-move block-move)))
    ;; 3. Take center
    (when (null (aref board 1 1))
      (return-from rule-based-ai-move (list 1 1)))
    ;; 4. Take corners
    (dolist (corner '((0 0) (0 2) (2 0) (2 2)))
      (when (null (aref board (first corner) (second corner)))
        (return-from rule-based-ai-move corner)))
    ;; 5. Take any available move
    (dotimes (i 3)
      (dotimes (j 3)
        (when (null (aref board i j))
          (return-from rule-based-ai-move (list i j)))))
    nil))
```

### 2. Neural Network AIs
More complex AIs that learn from experience:

#### Common Characteristics
- 9-18-9 network architecture
  - 9 inputs (board state)
  - 18 hidden neurons (pattern recognition)
  - 9 outputs (move selection)
- 50,000 training epochs
- Memory system for experience storage
- Adaptive learning capabilities
- Performance tracking

#### Types of Neural Network AIs

1. **Defensive AI-0 (X)**
   - Primary Focus: Blocking opponent moves
   - Strategy:
     - Prioritizes defensive patterns
     - Learns from successful blocks
     - Maintains strong defensive position
   - Training Data:
     - Blocking winning moves
     - Center control
     - Corner defense
     - Complex defensive patterns (forks, diagonals)
   - Best for: Learning defensive strategies

2. **Aggressive AI-1 (O)**
   - Primary Focus: Winning opportunities
   - Strategy:
     - Takes corners and center
     - Creates winning opportunities
     - Maintains offensive pressure
   - Training Data:
     - Creating winning opportunities
     - Corner attacks
     - Center control
   - Best for: Learning offensive strategies

3. **Serge (S) - Balanced**
   - Primary Focus: Balanced approach
   - Strategy:
     - Mix of offense and defense
     - Adapts to opponent's style
     - Flexible play style
   - Training Data:
     - Mix of offense and defense
     - Edge control
     - Center preference
     - Corner as backup
   - Best for: Learning balanced strategies

4. **Renee (R) - Random**
   - Primary Focus: Adaptive learning
   - Strategy:
     - Starts with random moves
     - Learns from successful patterns
     - Develops unique strategies
   - Training Data:
     - Random but valid moves
     - Basic patterns
     - Center after corner
     - Corner after center
   - Best for: Learning adaptive strategies

5. **Counter AIs**
   a) **Defensive Counter (DC)**
   - Primary Focus: Counter-attack defense
   - Strategy:
     - Counter-attack focused
     - Edge control
     - Defensive patterns
   - Best for: Learning counter-defensive strategies

   b) **Aggressive Counter (AC)**
   - Primary Focus: Aggressive counter-attack
   - Strategy:
     - Aggressive counter moves
     - Winning patterns
     - Center control
   - Best for: Learning counter-offensive strategies

   c) **Balanced Counter (BC)**
   - Primary Focus: Balanced counter
   - Strategy:
     - Balanced counter strategy
     - Mixed patterns
     - Center and corner control
   - Best for: Learning balanced counter strategies

   d) **Adaptive Counter (AD)**
   - Primary Focus: Adaptive counter
   - Strategy:
     - Adaptive counter strategy
     - Center control
     - Corner control
     - Adaptive patterns
   - Best for: Learning adaptive counter strategies

#### Training Process
1. **Initial Training**
   - 50,000 epochs on base patterns
   - Pattern recognition development
   - Basic strategy formation

2. **Game Experience**
   - Saves board states
   - Records outcomes
   - Learns from mistakes
   - Adapts strategies

3. **Memory System**
   - Stores successful moves
   - Remembers opponent patterns
   - Builds strategy database
   - Persists between sessions

#### Performance Tracking
- Win rate
- Learning progress
- Strategy effectiveness
- Adaptation speed
- Memory utilization

## Learning Process

### How Neural Networks Learn
1. **Initial Training**
   - 50,000 training epochs
   - Basic pattern recognition
   - Strategy development

2. **Game Experience**
   - Saves board states
   - Records outcomes
   - Learns from mistakes

3. **Memory System**
   - Stores successful moves
   - Remembers opponent patterns
   - Builds strategy database

### Learning Timeline
1. **First Games**
   - Basic pattern recognition
   - Many mistakes
   - Learning fundamentals

2. **Middle Phase**
   - Better pattern recognition
   - Fewer mistakes
   - Strategy development

3. **Advanced Phase**
   - Complex pattern recognition
   - Strategic decision-making
   - Adaptive play

## Tournament System

### Running Tournaments
```lisp
(run-tournament)
```

### Tournament Features
1. **Scoreboard**
   - Tracks wins/losses/ties
   - Shows learning progress
   - Displays performance metrics

2. **Player Management**
   - Configurable player list
   - Different AI types
   - Performance tracking

3. **Learning Integration**
   - Saves experiences
   - Loads previous knowledge
   - Continuous improvement

## Advanced Concepts

### Neural Network Architecture
- 9-18-9 network structure
- Input layer: Board state
- Hidden layer: Pattern recognition
- Output layer: Move selection

### Training Data
```lisp
(defparameter *tictactoe-training-data-0*
  (list
    ;; Defensive moves
    (list #(1 1 0  -1 -1 0  0 0 0) #(0 0 1  0 0 0  0 0 0))
    ;; Center control
    (list #(0 0 0  0 0 0  0 0 0) #(0 0 0  0 1 0  0 0 0))
    ;; Corner defense
    (list #(1 0 0  0 0 0  0 0 0) #(0 0 0  0 0 0  1 0 0))))
```

### Performance Metrics
- Win rate
- Learning progress
- Strategy effectiveness
- Adaptation speed

## Practical Exercises

### Exercise 1: Understanding Rule-Based AI
1. Run a game against Rule-Based AI
2. Observe its move patterns
3. Try to predict its moves
4. Analyze its strategy

### Exercise 2: Training Neural Network AI
1. Run a tournament
2. Observe learning progress
3. Compare performance
4. Analyze improvements

### Exercise 3: Custom AI Development
1. Create new training data
2. Modify network parameters
3. Test performance
4. Compare results

## Troubleshooting

### Common Issues
1. **AI Not Learning**
   - Check training data
   - Verify memory system
   - Ensure proper initialization

2. **Poor Performance**
   - Increase training epochs
   - Add more training data
   - Adjust network parameters

3. **Memory Issues**
   - Check file permissions
   - Verify save/load functions
   - Monitor memory usage

### Getting Help
- Check documentation
- Review error messages
- Analyze performance metrics
- Consult code comments

## Conclusion
This tutorial provides a foundation for understanding AI strategies in Tic Tac Toe. By studying the different approaches and experimenting with the code, you can develop a deeper understanding of AI learning and strategy development.

## Next Steps
1. Experiment with different AI types
2. Modify training parameters
3. Create custom strategies
4. Develop new AI approaches

## Resources
- [Rule-Based AI Discussion](RULE-BASED-AI-DISCUSSION.md)
- [Scoreboard Documentation](scoreboard.lisp)
- [AI Memory System](ai_memories.lisp)
- [Tournament Management](tournament-players.lisp)

## Integrating with a Backend API

You can extend your Tic Tac Toe AI tournament to send game or match results to a backend API for storage, analysis, or visualization. This is useful for building dashboards, tracking AI progress over time, or integrating with other systems.

### How It Works
1. Each game or match runs as usual in your Python code.
2. After each game or match, collect the results (moves, winner, board states, etc.).
3. Send these results to a backend API using HTTP requests (commonly with the `requests` library in Python).
4. The backend API can store results in a database, provide a web dashboard, or trigger further processing.

### Example: Sending Match Results to an API

```python
import requests

def send_match_result_to_api(match_data):
    url = "https://your-backend-api.com/api/tictactoe/results"
    try:
        response = requests.post(url, json=match_data)
        response.raise_for_status()
        print("Match result sent successfully!")
    except Exception as e:
        print(f"Failed to send match result: {e}")
```

Call this function at the end of each match, passing a dictionary with the match data (players, moves, winner, etc.).

### Integration Steps
- Decide what data you want to send (e.g., player names, moves, winner, full board history).
- Modify your code (e.g., in `best_of_3_match` or after each game) to call the API with this data.
- Have a backend API ready to receive and process/store the data.

### Use Cases
- Build a web dashboard to visualize tournament results.
- Store AI learning progress for long-term analysis.
- Integrate with other systems for advanced AI research.

This approach allows you to scale your AI experiments and integrate with modern web technologies. 