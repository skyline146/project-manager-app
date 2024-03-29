# Project Manager Web App

## You can try it here: https://tasks-project-manager.vercel.app/

## Application has two pages:

### Projects page

Page that shows all your projects. After choosing any project you will be redirect to tasks page.

### Tasks page

Page that have 3 columns: Queue, Development and Done. There you can create new task and move it between columns and change order.

### Used technologies and libraries:

`TypeScript`
`React`
`React router dom`
`Redux(Toolkit)`
`React beautiful drag-n-drop`

For now data stores in local storage. But in future there will be login page with firebase.

## Updates log:

## v1.0

Added projects slice with redux. There is opportunity to create and delete projects and tasks. All data saves in local storage.

### v1.1

Added column highlight when dragging tasks.

### v1.2

Updated projects interface, added columns in projects slice.

### v1.3

Added opportunity to change tasks order in column.

### v1.4

Added opportunity to move task status between columns and project status check.

## v2.0

Added mixins in scss, modal overflow scroll and project moved to Vercel.

### v2.1

Router smooth transition.

### v2.2

Change modal logic for creating projects and tasks, added project edit modal.
Projects view improvements.

### v2.3

Optimization improvements, bug fixes. Modal added out of Routes, so it can be rendered everywhere.

### v2.4

Added colored border for tasks to highlight status.
