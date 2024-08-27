---
layout: post
title: 'Making Karen Manageable: A Modular State Machine Design'
subtitle : Part 1 of the Grocery Run Dev Blog Series
tags: [Dev Progress, Technical]
author: Zaire Wilson
comments : True
---

Summer ’24 has been a long one—lots of ups, lots of downs. One of those ups has been the work I’ve been doing redeveloping my game Grocery Run in Unreal Engine 5 (it was originally developed in Unity). Now that I’ve made some solid progress on a few of the subsystems, this post kicks off a series where I’ll be sharing some developer insights and progress. Some posts will dive deep into the technical and programming side of things, while others will be more about my general thoughts on design. I’ll be tagging these posts to keep them organized by topic, so if you’re here for the coding or the design philosophy, you can easily find what you’re after.
\
\
In this first post, I’ll be breaking down one of the key systems that drives the dynamic behavior in Grocery Run: a flexible State Machine (SM) that lets me add state and transition definitions through Blueprints and Data Assets without needing to add more C++ code. This system has been a game-changer in keeping things scalable while letting me experiment and iterate quickly.

## Understanding the State Machine Pattern (Quick Overview):
So what’s a State Machine (SM), and why bother? A State Machine is a well-established pattern that’s been around for years, both in games and in software architecture more generally. The basic idea is that **any object in a game can have a set of behaviors defined by a “state” and at any point, that object can switch from one state to another based on specific logic.**
\
\
For example, in Grocery Run, the main enemy NPCs are “Karens” with three main states: Idle, Patrol, and Chase (there are more, but I’ll stick to these three for now). When Karen is in the Idle state, she’s playing her idle animation, scanning the environment (by casting rays that detect the player), and a timer tracks how long she’s been idle. The logic here says that if the timer hits a certain threshold, Karen will transition to the Patrol state, where she begins wandering the aisles.
{% include image.html url="/assets/img/StateMachineFlow.png" description="Karen State Machine Visual" %}
\
\
Here’s where the State Machine pattern comes in handy. That switch from Idle to Patrol is called a **transition**. In a State Machine, transitions are handled by a dedicated Transition class, which defines the logic for moving between states. Instead of burying that logic inside an if-else statement in a massive class, it’s broken out into its own piece. So, the logic that checks whether the timer is up and triggers the Patrol behavior is kept clean and separate, making it easier to adjust or expand later on.
{% include image.html url="/assets/img/GRIdleToPatrol.gif" description="Karen Transitioning from Idle to Patrol Based on Timing" %}
\
\
This separation is what makes State Machines powerful. By breaking behaviors into states and transitions, you can keep everything modular and scalable. Even if you’re not familiar with those terms, the key idea is that your game’s code stays organized and easier to manage as it grows. When you want to add a new behavior or tweak an existing one, you don’t have to worry about breaking everything else. If you’re unfamiliar with the State pattern and want to learn more, I highly recommend checking out the State chapter in Level Up Your Code With Game Programming Patterns. 
## Taming a Wild Karen
I bet you’re thinking to yourself, “Zaire’s so cool, he’s implemented something that’s been done a billion times before, very demure, very mindful.” So first of all: 1.) Boo you, I’m sharing what I did anyway and you can’t stop me, and 2.) Seriously though, you should stick around because I genuinely couldn’t find any articles or tutorials that show what I’m about to cover.
\
\
One of the coolest things I’m really starting to appreciate about Unreal Engine is how you can use both C++ and Blueprints (visual, node-based programming) to develop a game. For me, writing complex logic in C++ feels natural, but Blueprints make piecing together and tweaking that logic much more dynamic. Here’s what I mean: whenever you want to make a C++ change, you have to close the editor, make the change, rebuild the solution, and then reopen the editor. It’s a process. But with Blueprints, you can recompile directly within the editor—so if something doesn’t work, you can catch and fix it with way less hassle than in C++.
\
\
Now using both in tandem is where it gets super dope. You can expose functions, variables, and other class properties to Blueprints, making the C++ code act like an API that handles the more complex stuff while keeping design flexible in Blueprints.
\
\
After I decided to implement a generic State Machine, I immediately wanted to build a system that would allow me to create all the components of the State Machine without needing to touch C++ again. That turned out to be more challenging than I anticipated, but I’m happy to say I figured it out!
\
\
Here’s a high-level overview of how the system works:
1. **Attach the StateMachine Component:** Start by attaching a StateMachine actor component to the actor that needs the state machine.
2. **Create and Link State and Transition Data Assets:** Create the Data Assets for each State and Transition that make up the State Machine. Link them accordingly.
3. **Populate the StateMachine with State References:** Add references to all relevant State Data Assets into the StateMachine’s States list.
4. **Bind State Events with Blueprints:** Use Blueprints to bind character behaviors to the StateOnEnter, StateOnExit, and StateOnUpdate events. This is where you define what happens when a state is entered, updated, or exited.
5. **Bind Transition Validation with Blueprints:** Use Blueprints to bind Transition Validation Functions (which check character properties) to the TransitionOnValidationCheck event. This determines when and how transitions occur based on conditions you define.

\
\
The real MVPs of this system are the Transition and State Data Assets. If you’re familiar with Scriptable Objects in Unity, Data Assets in Unreal work similarly. Users create instances of a class (inheriting from UDataAsset) that live as assets in the project’s Content folder. Since they exist outside of the game, they can be consistently referenced by game objects and other data assets.
\
\
In this system, these Data Assets create a bridge between the data they hold and the UObjects that represent them at runtime. Essentially, the Data Assets are blueprints for the runtime objects that do the heavy lifting.
\
\
What’s especially powerful is how the State and Transition Data Assets define each other. The State Data Asset holds a list of Transition Data Assets, while each Transition Data Asset contains references to a “From” State Data Asset and a “To” State Data Asset. This setup neatly organizes the relationships between states and transitions, making everything modular and easy to manage.
\
\
Because of this Data Asset–Object mapping, users can easily define transition validations and state behaviors. They can reference the Data Assets directly to create the necessary bindings in Blueprints. In other words, the Data Asset serves as a reliable handle that lets the system bind the logic and conditions needed for transitions and behaviors without additional C++ code.




{% include image.html url="/assets/img/GRIdleToPatrol.gif" description="Right Click and Hold to Pickup" %}
<h2>Camera Controll</h2>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Describe how I take player control away from rotating the camera while looking for groceries

{% highlight python %}
# test function
def test :
    print('hello world!')
{% endhighlight %}

<br>

<h2>2. Quotes</h2>
{% highlight html %}
> Hello World, This is quotes!
{% endhighlight %}
> Hello World, This is quotes!

<br>

<h2>3. `Backtick`</h2>
{% highlight html %}
`Grape-Theme`
{% endhighlight %}
`Grape-Theme`

