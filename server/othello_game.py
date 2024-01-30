class OthelloGame:
    def __init__(self):
        self.board_size = 8
        self.board = [
            [" " for _ in range(self.board_size)] for _ in range(self.board_size)
        ]
        self.board[3][3] = self.board[4][4] = "O"
        self.board[3][4] = self.board[4][3] = "X"
        self.current_player = "X"
        self.game_over = False
        self.scores = {"X": 2, "O": 2}

    def make_move(self, row, col):
        if self.is_valid_move(row, col):
            self.board[row][col] = self.current_player
            self.scores[self.current_player] += 1

            directions = [
                (-1, 0),
                (1, 0),
                (0, -1),
                (0, 1),
                (-1, -1),
                (-1, 1),
                (1, -1),
                (1, 1),
            ]

            for dr, dc in directions:
                r, c = row + dr, col + dc
                flips = []

                while 0 <= r < self.board_size and 0 <= c < self.board_size:
                    if self.board[r][c] == self.get_opponent():
                        flips.append((r, c))
                    elif self.board[r][c] == self.current_player and flips:
                        for flip_row, flip_col in flips:
                            self.board[flip_row][flip_col] = self.current_player
                        break
                    else:
                        break

                    r += dr
                    c += dc

            self.switch_player()
            self.check_game_over()

            return {"message": "Move successful"}
        else:
            return {"message": "Move successful"}

    def is_valid_move(self, row, col):
        if not (0 <= row < self.board_size) or not (0 <= col < self.board_size):
            return False
        if self.board[row][col] != " ":
            return False

        directions = [
            (-1, 0),
            (1, 0),
            (0, -1),
            (0, 1),
            (-1, -1),
            (-1, 1),
            (1, -1),
            (1, 1),
        ]

        for dr, dc in directions:
            r, c = row + dr, col + dc
            found_opponent = False

            while 0 <= r < self.board_size and 0 <= c < self.board_size:
                if self.board[r][c] == self.current_player:
                    if found_opponent:
                        return True
                    else:
                        break
                elif self.board[r][c] == " ":
                    break
                else:
                    found_opponent = True

                r += dr
                c += dc

        return False

    def get_opponent(self):
        return "O" if self.current_player == "X" else "X"

    def switch_player(self):
        self.current_player = self.get_opponent()

    def check_game_over(self):
        available_moves = any(
            self.is_valid_move(i, j)
            for i in range(self.board_size)
            for j in range(self.board_size)
        )
        if not available_moves:
            self.game_over = True

    def get_board(self):
        return self.board

    def is_game_over(self):
        return self.game_over

    def reset_game(self):
        self.board = [
            [" " for _ in range(self.board_size)] for _ in range(self.board_size)
        ]
        self.board[3][3] = self.board[4][4] = "O"
        self.board[3][4] = self.board[4][3] = "X"
        self.current_player = "X"
        self.game_over = False
        self.scores = {"X": 2, "O": 2}
