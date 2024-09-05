# 04/09/24
Setup is very similar to patchlytics: Collection of different type of objects, add, update, delete, list, view, different editors for different types, organised into projects / scenarios.

**Factor:** We want a global pool of devices although they still could do with being namespaced in some way. How are device and scenarios associated? Alt: scenarios live alongside device. Create devices then scenario. Have an action on scenario that creates a new device and add to scenario at once.

**Dev Path:**

  - Main launch page layout. Side bare same structure as patchy - new device scenario section, login and status.
  - Forms for each device type.
  - Widget for profile input and edit.

**Issue: Reusable profiles and constraints?**

**Issue: Time span and interval specification**
To use profiles in same scenario must at least all be multiple or factor of some constant span length. Would be cool if it we're configurable. Dynamic is out of scope.

Alt: Just support any multiple or divisor of 48 upto a degree. 2, 4, 8, 12, 24, 48, 96, 192, 240, 288. In fact it's scenarios that need have this properties. So profile can have arbitrary basis but must match that of scenario to be used in such. Devices inherit.