let SEED = "666";
Nof1.SET_SEED(SEED);

let experiment_configuration_function = (writer) => { return {

    experiment_name: "TestExperiment",
    seed: SEED,

    introduction_pages: writer.stage_string_pages_commands([
        writer.convert_string_to_html_string("Please, just do this experiment only, when you have enough time, are concentrated enough, and motivated enough.\n\nPlease, open the browser in fullscreen mode (probably by pressing [F11])."),
        writer.convert_string_to_html_string("In this experiment, you will be asked to manually compute the result of a code analysis task.\n\nDon't worry, the logic is always based on counting conditions.")
    ]),

    pre_run_training_instructions: writer.string_page_command(
        writer.convert_string_to_html_string("You entered the training phase.")
    ),

    pre_run_experiment_instructions: writer.string_page_command(
        writer.convert_string_to_html_string("You entered the experiment phase.\n\nCount how many conditional statements are present in the code.")
    ),

    finish_pages: [
        writer.string_page_command(
            writer.convert_string_to_html_string("Almost done. Next, the experiment data will be downloaded. Please send the file to the experimenter.\n\nThank you!")
        )
    ],

    layout: [
        { variable: "AVariable", treatments: ["A", "B"] },
    ],

    training_configuration: {
        fixed_treatments: [
            ["AVariable", "A"],
            ["AVariable", "B"]
        ],
        can_be_cancelled: false,
        can_be_repeated: false
    },

    repetitions: 5,

    measurement: Nof1.Reaction_time(Nof1.keys(["0","1","2","3","4","5","6","7","8","9"])),

    task_configuration: (t) => {
        let treatment = t.treatment_combination[0].value;

        const snippetTemplates = [
            // Conditional
            { lines: ["if (z > 0) {", "    System.out.println(\"Positive\");", "}" ], isConditional: true },
            { lines: ["else if (z == 0) {", "    System.out.println(\"Zero\");", "}" ], isConditional: true },
            { lines: ["else {", "    System.out.println(\"Negative\");", "}" ], isConditional: true },
            { lines: ["if (x % 2 == 0) {", "    System.out.println(\"Even number\");", "}" ], isConditional: true },
            { lines: ["if (y < 5 && z > 2) {", "    System.out.println(\"Complex condition met\");", "}" ], isConditional: true },
            { lines: [
                    '<span style="color:blue;">if</span> (z > 0) {',
                    '    <span style="color:green;">System.out.println</span>(<span style="color:red;">"Positive"</span>);',
                    '}'
                ], isConditional: true },

            // Non-conditional
            { lines: ["while (x < 10) {", "    x++;", "}" ], isConditional: false },
            { lines: ["// This is a debug comment", "System.out.println(\"Debugging...\");", "// End of debug" ], isConditional: false },
            { lines: ["int result = x + y;", "System.out.println(\"Result: \" + result);", "// Calculation done" ], isConditional: false },
            { lines: ["for (int i = 0; i < 3; i++) {", "    System.out.println(i);", "}" ], isConditional: false },
            { lines: ["String name = \"Test\";", "System.out.println(\"Hello, \" + name);", "// Greeting complete" ], isConditional: false },
            { lines: ["// Log current time", "System.out.println(System.currentTimeMillis());", "// End time log" ], isConditional: false },
            {lines: ["int[] arr = {1, 2, 3, 4, 5};", "arr[0] = 10;", "System.out.println(arr[0]);"], isConditional: false},
            {lines: ["String str = \"  Hello World  \";", "str = str.trim();", "System.out.println(str);"], isConditional: false}
        ];

        // Code generation for Treatment A
        if (treatment === "A") {
            generateCodeSnippet(t, writer, snippetTemplates, treatment);
        }

        // Code generation for Treatment B
        else if (treatment === "B") {
            generateCodeSnippet(t, writer, snippetTemplates, treatment);
        }
    }

}};

function generateCodeSnippet(t, writer, snippetTemplates, treatment) {
    const totalStatements = 9;
    const chosenSnippets = [];
    let countConditionals = 0;

    for (let i = 0; i < totalStatements; i++) {
        let snippet = snippetTemplates[Nof1.new_random_integer(snippetTemplates.length)];
        chosenSnippets.push(snippet);
        if (snippet.isConditional) countConditionals++;
    }

    const x = Nof1.new_random_integer(10);
    const y = Nof1.new_random_integer(10);

    let codeLines = [];
    codeLines.push("public class Example {");
    codeLines.push("    public static void main(String[] args) {");
    codeLines.push(`        int x = ${x};`);
    codeLines.push(`        int y = ${y};`);
    codeLines.push("        int z = x + y;");

    for (const snippet of chosenSnippets) {
        for (const line of snippet.lines) {
            codeLines.push("        " + line);
        }
    }

    codeLines.push("    }");
    codeLines.push("}");

    t.do_print_task = () => {
        writer.clear_stage();
        writer.print_html_on_stage("<div class='sourcecode'>" + writer.convert_string_to_html_string(codeLines.join("\n")) + "</div>");
    };

    t.expected_answer = "" + countConditionals;

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
