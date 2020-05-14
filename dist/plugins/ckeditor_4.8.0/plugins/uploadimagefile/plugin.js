
CKEDITOR.plugins.add( 'uploadimagefile', {

	// Register the icons. They must match command names.
	icons: 'uploadimagefile',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		// Define the editor command that inserts a uploadimagefile.
		editor.addCommand( 'insertuploadimagefile', {

			// Define the function that will be fired when the command is executed.
			exec: function( editor ) {
				$("#edit-bt-image-button").click();
			}
		});

		// Create the toolbar button that executes the above command.
		editor.ui.addButton( 'uploadimagefile', {
			label: 'Upload Image',
			command: 'insertuploadimagefile',
			toolbar: 'insert'
		});
	}
});
