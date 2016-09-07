* The process of looking for a sequence of actions that reaches the goal is called <b>search</b>.

* <b>Goal formulation</b>, based on the current situation and the agent’s performance
measure, is the first step in problem solving.

* <b>Problem formulation</b> is the process of deciding what actions
and states to consider, given a goal.

* <b>A search algorithm</b> takes a problem as input and returns a solution in the form of an action
sequence. Once a solution is found, the actions it recommends can be carried out. This
is called the execution phase.

* A problem can be defined formally by five components:
  - The <b>initial state</b> that the agent starts in;
  - A description of the <b>possible actions</b> available to the agent;
  - A description of what each action does; the formal name for this is the <b>transition model</b>, 
    specified by a function RESULT(s, a) that returns the state that results from
    doing action a in state s;

* Together, the initial state, actions, and transition model implicitly define the <b>state space</b>
of the problem—the set of all states reachable from the initial state by any sequence
of actions. The state space forms a directed network or graph in which the nodes
are states and the links between nodes are actions.

* <b>A path</b> in the state space is a sequence of states connected by a sequence of actions.

* The <b>goal test</b>, which determines whether a given state is a goal state.

* A <b>path cost</b> function that assigns a numeric cost to each path. The problem-solving
agent chooses a cost function that reflects its own performance measure. We can assume that 
the cost of a path can be described as the sum of the costs of the individual actions along the path. 
The <b>step cost</b> of taking action a in state s to reach state s' is denoted 
by c(s,a,s').
