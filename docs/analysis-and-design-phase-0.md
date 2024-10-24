# ANALYSIS
All cost and constraints apply over demand in some way obviously.

Cost Functions:

  - Cummulative over some period.
  - Timewise.
  - Linear, quadratic, ...
  - Constraint parametized (IDevice)

Constraint Types:

  - l|h bounds.
  - cummulative over some window or implicitly all time.
  - sliding window.
  - run-level.

# RESOLUTIONS & REQUIREMENTS

  - Conceptually goal is frontend to device-kit (convex, discrete, da-ahead)
  - User can CRUDL devices, profiles and scenarios. These are organized into projects. Projects exist mainly for applying different access control and defaults. In future can allow to migrate or copy content from project to project.
  - Components (devices, profiles, scenarios) have a basis fixed at creation time. This is how many time step they have.
  - There is association between profiles, devices, and scenarios - to be associated the things must have compatible basis.
    - Scenarios have many devices.
    - Devices have zero or more profiles for different things depending on the device type.
  - You can only uses basis of 2, 4, 8, 12, 24, 48, 96, 192, 240, 288, with default being 48. In future we can allow arbitrary.

# IMPLEMENTATION PLAN

  - Layout is ~same as patchlytics so just do that. Opportunity to test doing model the not OO way.
  - It's all localStorage to start.
  - Forms for each device type.
  - Widget for profile input and edit.

# KEY QUESTIONS
**Q: Relationship between a devices and profiles?**
D: Exactly what are they?

  - L|H bounds for ~ every device type. Can either be a profile or a
  - Fixed device profile - the L|H bound are equal.

That's it AFAIK (could be more ..). To have be sat L <= H all t. But if profiles are mutable this can change after association how to handle? Solution: just allow unsat! This is fine. Secondly profile can be deleted. How to handle? Alt 1: Make a copy on ref. Alt 2: ON DELETE ERROR. Alt 3: ON DELETE CASCADE. Alt 4: Ref by id and let it dangle - "the profile does not exist, or just clean up on demand - silently unset it.

Related issue is results are tied to a certain version of a scenario. Seem clear need to keep both together. So if scenario can evolve. how are we doing that? For device-kit experiements we did it explicitly - create the scenario run the optimisation then stash both. Alt 1: same "leave it to the user" approach here giving a way to save or snapshot a  scenario. Is there an better alt? Alt 2: keep a version of everything and full lineage, stash version number with ecah optimisation result. Alt 3: Take a snapshot (serialization) at optimisation time. #3 is an addon to #1. #2 is overkill

*Conclusion:* Alt 1 initially. User can export optimisation results and scenario.

**Q: "Scenarios"?**
From device-kit have the term "device set", but this is really just a bus, use "bus" herein. Can attempt to solve any bus really. So what's a "scenario" over a bus? Given a collection of devices in the same name space, would be useful to be able to take some subset of device and generation technologies then run optimization. In a given space there's is many many different scenarios you might want to run and for each you need a bus .. So we just have busses and any bus can be solved. We also need projects, but this is different from a scenario because

Summary: "Scenario" whatever that ever meant out, "bus" in. Projects are different again.

**Q: Projects?**
For mk1 would be easier not to have to bother with projects. Just have a hodge podge of devices, profiles, busses. Yeah sure but ... ultimately we do want projects: Story: Billy at home. Bill for friend. Billy at work. Billy as a consultant that works on many different sites ... Sharing things between project is beyond mk1.

Summary: mk1 project is just a dumb container.

**Q: Device Types:**
At one level a device is just a a collection of constraints and costs. Those two things in aggregate for the device's nature / logical type. But it's still useful / necessary to have device type? Story: Add solar, battery, load. Alternative to type is labels. Can even have a "type" label. What's necessary is not type but reuse. There is two main wasy to to this: Type / classical OO class/instance relationship, and the prototype approach.

Solved this in device-kit by actually having types. When you use a device type you instantiate it with all the necessary parameters. Different type have different parameters, require different form types, there is a fixed number of types. Downside: set of types is fixed and this is limiting. Consideration: If we had a type that was just an arbitrary collection of costs and constraints to allow ~arbitrary device type construction, we still probably want to reuse instances of that class in a prototyping fashion.

The prototype alt: particular issue: we have two collections costs and constraints, what's the extension semantics? Solution: it's ambiguous with arrays and merge doesn't really work for arrays, but we definitely want merge semantics so .. all constraints are named in a Map. Can be overridden via the name. New ones added via new names.

How does customizing an object work exactly?: When you add a device to a bus your adding a placeholder that extends that prototype. A bus then is a specific context that does overriding. From users perspective it's just a device they edit. Leads to another question: Device that only belong to a given bus.  Global device that don't are really ~ named prototypes or something. Fine.

**Q Cost/Constraint Types?:**
What about constraints and costs? We've presumed the system is typed based till now: You select constraint/cost type and enter the parameters but to be consistent should they be prototypical too?! What does that mean exactly? Constraints, costs still have to have a form.

Scenerio: We have named devices, cost and constraints. Like you can create a device prototype (named one) you can for costs and constraints. Problem is we need some kind of maths interpreter to define constraints.

**Solution - Device and Constraint Types** Initially we'll have built-in cost and constraints. These are just as if the user had defined them but they are predefined. Could do the same for device. May or may not. We'll tag predefined somehow so they don't show up in user lists.


Costs: is some mathematical function, exposes a bunch of paremeter with defaults. These can be overridden. They have a schema so we can build an edit form for them. Constraints:

**Q: Incomplete Devices**
If devices re just collections of costs and constraints, they can neve be incomplete ... Solved.
---
