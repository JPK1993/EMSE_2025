let SEED = "666";
Nof1.SET_SEED(SEED);

let experiment_configuration_function = (writer) => { return {

    experiment_name: "Java Syntax-Highlighting",
    seed: SEED,

    introduction_pages: writer.stage_string_pages_commands([
        writer.convert_string_to_html_string("Please, just do this experiment only, when you have enough time, are concentrated enough, and motivated enough.\n\nPlease, open the browser in fullscreen mode (probably by pressing [F11])."),
        writer.convert_string_to_html_string("In this experiment, you will be asked to manually compute the result of a code analysis task.\n\nDon't worry, the logic is always based on counting conditions.")
    ]),

    pre_run_training_instructions: writer.string_page_command(
        writer.convert_string_to_html_string("You entered the training phase.\n\nCount how many String-Literals are present in the code. The total number will be between 0 and 9.")
    ),

    pre_run_experiment_instructions: writer.string_page_command(
        writer.convert_string_to_html_string("You entered the experiment phase.\n\nCount how many String-Literals are present in the code. The total number will be between 0 and 9.")
    ),

    finish_pages: [
        writer.string_page_command(
            writer.convert_string_to_html_string("Almost done. Next, the experiment data will be downloaded. Please send the file to the experimenter.\n\nThank you!")
        )
    ],

    layout: [
        { variable: "Highlighting", treatments: ["No", "Yes"] },
    ],

    training_configuration: {
        fixed_treatments: [],
        can_be_cancelled: false,
        can_be_repeated: false
    },

    repetitions: 20,

    measurement: Nof1.Reaction_time(Nof1.keys(["0","1","2","3","4","5","6","7","8","9"])),

    task_configuration: (t) => {
        let treatment = t.treatment_combination[0].value;

        const snippetTemplates = [

            { fragment: '"if (x > 0) \\"then\\""', literalCount: 1 },
            { fragment: '"else if (x == 0)"', literalCount: 1 },
            { fragment: '"else { \\"fallback\\" }"', literalCount: 1 },
            { fragment: '"while (flag) { \\"loop\\" }"', literalCount: 1 },
            { fragment: '"condition?" + "\\"true\\"" + "\\"false\\""', literalCount: 3 },
            { fragment: '"x < 10 && y > 5"', literalCount: 1 },
            { fragment: '"switch (val) { case 1: break; }"', literalCount: 1 },
            { fragment: '"if (" + varName + ")"', literalCount: 1 }, // only one literal: "if ("
            { fragment: '"} else if (" + input + ".equals(\\"exit\\")) {"', literalCount: 2 },

            { fragment: '"The result is: "', literalCount: 1 },
            { fragment: '"Value: " + "\\"42\\""', literalCount: 2 },
            { fragment: '"name" + "\\" \\"" + "surname"', literalCount: 3 },
            { fragment: '"System.out.println(" + "\\"Hello\\" + ")"', literalCount: 3 },
            { fragment: '"+" + "\\"sum\\"" + "+"', literalCount: 3 },
            { fragment: '"\\"Quoted\\"" + " text inside"', literalCount: 2 },
            { fragment: '"Escape this: " + "\\"\\\\\\"" ', literalCount: 2 },
            { fragment: '"[DEBUG] Output: "', literalCount: 1 },
            { fragment: '"Hello, " + "\\"world\\"!"', literalCount: 2 },
            { fragment: '"Total = " + total', literalCount: 1 },
            { fragment: '"--End of Line--"', literalCount: 1 }
        ];


        const snippetTemplatesHighlighted = [
            { fragment: '<span style="background-color:red;color:white;">"if (x > 0) \\"then\\""</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"else if (x == 0)"</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"else { \\"fallback\\" }"</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"while (flag) { \\"loop\\" }"</span>', literalCount: 1 },
            { fragment:
                    '<span style="background-color:red;color:white;">"condition?"</span> + ' +
                    '<span style="background-color:red;color:white;">"\\"true\\""</span> + ' +
                    '<span style="background-color:red;color:white;">"\\"false\\""</span>',
                literalCount: 3
            },
            { fragment: '<span style="background-color:red;color:white;">"x < 10 && y > 5"</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"switch (val) { case 1: break; }"</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"if ("</span> + ' +
                        'varName +' +
                    '   <span style="background-color:red;color:white;">")"</span>', literalCount: 2 },
            { fragment:
                    '<span style="background-color:red;color:white;">"} else if ("</span> + input + ' +
                    '<span style="background-color:red;color:white;">".equals(\\"exit\\")) {"</span>',
                literalCount: 2
            },

            { fragment: '<span style="background-color:red;color:white;">"The result is: "</span>', literalCount: 1 },
            { fragment:
                    '<span style="background-color:red;color:white;">"Value: "</span> + ' +
                    '<span style="background-color:red;color:white;">"\\"42\\""</span>',
                literalCount: 2
            },
            { fragment:
                    '<span style="background-color:red;color:white;">"name"</span> + ' +
                    '<span style="background-color:red;color:white;">"\\" \\""</span> + ' +
                    '<span style="background-color:red;color:white;">"surname"</span>',
                literalCount: 3
            },
            { fragment:
                    '<span style="background-color:red;color:white;">"System.out.println("</span> + ' +
                    '<span style="background-color:red;color:white;">"\\"Hello\\""</span> +' +
                    '<span style="background-color:red;color:white;">")"</span>',
                literalCount: 3
            },
            { fragment:
                    '<span style="background-color:red;color:white;">"+" </span> + ' +
                    '<span style="background-color:red;color:white;">"\\"sum\\""</span> + ' +
                    '<span style="background-color:red;color:white;">"+" </span>',
                literalCount: 3
            },
            { fragment:
                    '<span style="background-color:red;color:white;">"\\"Quoted\\""</span> + ' +
                    '<span style="background-color:red;color:white;">" text inside"</span>',
                literalCount: 2
            },
            { fragment:
                    '<span style="background-color:red;color:white;">"Escape this: "</span> + ' +
                    '<span style="background-color:red;color:white;">"\\"\\\\\\"" </span>',
                literalCount: 2
            },
            { fragment: '<span style="background-color:red;color:white;">"[DEBUG] Output: "</span>', literalCount: 1 },
            { fragment:
                    '<span style="background-color:red;color:white;">"Hello, "</span> + ' +
                    '<span style="background-color:red;color:white;">"\\"world\\"!"</span>',
                literalCount: 2
            },
            { fragment: '<span style="background-color:red;color:white;">"Total = "</span> + total', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"--End of Line--"</span>', literalCount: 1 }

        ];


        // Code generieren für Treatment A
        if (treatment === "No") {
            generateCodeSnippet(t, writer, snippetTemplates, treatment);
        }

        // Code generieren für Treatment B
        else if (treatment === "Yes") {
            generateCodeSnippet(t, writer, snippetTemplatesHighlighted, treatment);
        }
    }

}};

function generateCodeSnippet(t, writer, snippetTemplates) {
    const totalStatements = 3;
    const chosenSnippets = [];
    let countConditionals = 0;
    let totalLiteralCount = 0;

    for (let i = 0; i < totalStatements; i++) {
        let snippet = snippetTemplates[Nof1.new_random_integer(snippetTemplates.length)];
        chosenSnippets.push(snippet);
        totalLiteralCount += snippet.literalCount;
    }

    let codeLines = [];

    let concatenatedLine = "";
    for (let i = 0; i < chosenSnippets.length; i++) {
        const snippet = chosenSnippets[i];
        concatenatedLine += snippet.fragment;
        if (i < chosenSnippets.length - 1) {
            concatenatedLine += " + ";
        }
    }

    codeLines.push(concatenatedLine); 


    t.do_print_task = () => {
        writer.clear_stage();
        writer.print_html_on_stage(
            "<div class='sourcecode'><pre><code>" + codeLines.join("\n") + "</code></pre></div>"
        );
    };

    t.expected_answer = "" + totalLiteralCount;

    t.accepts_answer_function = (given_answer) => /^[0-9]$/.test(given_answer);

    t.do_print_error_message = (given_answer) => {
        writer.clear_stage();
        writer.clear_error();
        writer.print_html_on_error("<h1>Invalid answer: " + given_answer + "</h1>");
    };

    t.do_print_after_task_information = () => {
        writer.clear_error();
        writer.print_string_on_stage(writer.convert_string_to_html_string(
            "Question complete.\n\nIf you feel distracted, take a short break.\n\nPress [Enter] to continue."
        ));
    };
}

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);
