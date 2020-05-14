const { task, src, series } = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const jest = require('gulp-jest').default;

// kiểm tra code bằng eslint
task('lint', () =>
    src(['server/bootstrap/**/*.js', 'server/config/**/*.js', 'server/module/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

// chạy migrate migrate
task('migrate_latest', async done => {
    let exit_code = 0;
    try {
        const migrate = require('./server/bootstrap/runner_migrate');
        await migrate.latest();
    } catch (e) {
        console.error(e);
        exit_code = 1;
    }

    done();
    process.exit(exit_code);
});

// chạy migrate rollback
task('migrate_rollback', async done => {
    let exit_code = 0;
    try {
        const migrate = require('./server/bootstrap/runner_migrate');
        await migrate.rollback();
    } catch (e) {
        console.error(e);
        exit_code = 1;
    }

    done();
    process.exit(exit_code);
});

// chạy migrate up
task('migrate_up', async done => {
    console.log(process.argv);
    const args = process.argv.splice(3);
    let name = args.find(x => x.startsWith('--name'));
    name = name.substring(2).split('=')[1];

    let exit_code = 0;
    try {
        const migrate = require('./server/bootstrap/runner_migrate');
        await migrate.up({ name });
    } catch (e) {
        console.error(e);
        exit_code = 1;
    }

    done();
    process.exit(exit_code);
});

// chạy migrate down
task('migrate_down', async done => {
    const args = process.argv.splice(3);
    let name = args.find(x => x.startsWith('--name'));
    name = name.substring(2).split('=')[1];

    let exit_code = 0;
    try {
        const migrate = require('./server/bootstrap/runner_migrate');
        await migrate.down({ name });
    } catch (e) {
        console.error(e);
        exit_code = 1;
    }

    done();
    process.exit(exit_code);
});

// run tasks
task('run:migrate_latest', series('migrate_latest'));
task('run:migrate_rollback', series('lint', 'migrate_rollback'));
task('run:migrate_up', series('lint', 'migrate_up'));
task('run:migrate_down', series('lint', 'migrate_down'));