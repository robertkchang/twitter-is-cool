module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks("grunt-mocha-test");

	grunt.initConfig({
		// pkg: grunt.file.readJSON("package.json"),
		express: {
				options: {
					port: 5000,
					script: './app.js'
				},
				dev: {
					options: {
						background: false,
						node_env: 'development'
					}
				},
				test: {
					options: {
						node_env: 'test'
					}
				}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'nyan',
					captureFile: 'results.txt', // Optionally capture the reporter output to a file
					quiet: false, // Optionally suppress output to standard out (defaults to false)
					clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
				},
				src: ['test/**/*.js']
			}
		}
	});

	grunt.registerTask("dev", ['express:dev']);
	grunt.registerTask("test", ['express:test', "mochaTest", 'express:test:stop']);
	grunt.registerTask("default", ["test"]);
};
