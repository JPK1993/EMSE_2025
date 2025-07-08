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

            // { fragment: 'abcdefghijabcdefghijabcdefghijabcdefghij', literalCount: 1 }, //test40


        const snippetTemplates = [

            { fragment: '"r4nd0m_g1bb3r1sh____w1th__extras!!!!!!"', literalCount: 1 },
            { fragment: '"<<<<<<__SYNTAX__ERROR__EMULATOR__>>>>>"', literalCount: 1 },
            { fragment: '"\\\\this\\\\"is\\\\"a\\\"weird\\\"case"', literalCount: 1 },
            { fragment: '"___ONLY__ONE__LITERAL_PRESENT_HERE____"', literalCount: 1 },
            { fragment: '"A_%%%%_%%%%_%%%%_%%%%_%%%%_%%%%_%%%%_A"', literalCount: 1 },

            { fragment: 'zqvDataHandler_9000 + "glorbix_42_12345"', literalCount: 1 },
            { fragment: '"xyz\\"\\"\\abc" + signal_strength_xyxyx', literalCount: 1 },
            { fragment: '"blurt\\"zed" + _cacheResultTempVal12345', literalCount: 1 },
            { fragment: '"vex--core--ultra" + tripleEncode(alpha)', literalCount: 1 },
            { fragment: 'tokenStreamVariable + "\\\\"escaped\\\""', literalCount: 1 },

            { fragment: '"alpha_" + "_bravoSequence42XYZ__123456"', literalCount: 2 },
            { fragment: '"####/\//" + "____chunk_02_complete____"', literalCount: 2 },
            { fragment: '"start-->" + "<-----finish_payload_____"', literalCount: 2 },
            { fragment: '"__init__" + configPath + "____done____"', literalCount: 2 },
            { fragment: 'errorStatus + "\\\\flag" + "!!!reset!!!"', literalCount: 2 },

            { fragment: '"alpha" + "beta" + "____gamma__________"', literalCount: 3 },
            { fragment: '"1234" + "4567" + "78910_padding_______"', literalCount: 3 },
            { fragment: '"!!" + "__" + "##__END_FRAGMENT____////"', literalCount: 3 },
            { fragment: '"err" + codeLevel + "msg" + "___end____"', literalCount: 3 },
            { fragment: '"pre" + dataChunk + "mid" + Val + "post"', literalCount: 3 },

        ];


        const snippetTemplatesHighlighted = [

            { fragment: '<span style="background-color:red;color:white;">"r4nd0m_g1bb3r1sh____w1th__extras!!!!!!"</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"<<<<<<__SYNTAX__ERROR__EMULATOR__>>>>>"</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"\\\\this\\\\"is\\\\"a\\\"weird\\\"case"</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"___ONLY__ONE__LITERAL_PRESENT_HERE____"</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"A_%%%%_%%%%_%%%%_%%%%_%%%%_%%%%_%%%%_A"</span>', literalCount: 1 },

            { fragment: 'zqvDataHandler_9000 + <span style="background-color:red;color:white;">"glorbix_42_12345"</span>', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"xyz\\"\\"\\abc"</span> + signal_strength_xyxyx', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"blurt\\"zed"</span> + _cacheResultTempVal12345', literalCount: 1 },
            { fragment: '<span style="background-color:red;color:white;">"vex--core--ultra"</span> + tripleEncode(alpha)', literalCount: 1 },
            { fragment: 'tokenStreamVariable + <span style="background-color:red;color:white;">"\\\\\\"escaped\\\""</span>', literalCount: 1 },

            { fragment: '<span style="background-color:red;color:white;">"alpha_"</span> + <span style="background-color:red;color:white;">"_bravoSequence42XYZ__123456"</span>', literalCount: 2 },
            { fragment: '<span style="background-color:red;color:white;">"####/\\//"</span> + <span style="background-color:red;color:white;">"____chunk_02_complete____"</span>', literalCount: 2 },
            { fragment: '<span style="background-color:red;color:white;">"start-->"</span> + <span style="background-color:red;color:white;">"<-----finish_payload_____"</span>', literalCount: 2 },
            { fragment: '<span style="background-color:red;color:white;">"__init__"</span> + configPath + <span style="background-color:red;color:white;">"____done____"</span>', literalCount: 2 },
            { fragment: 'errorStatus + <span style="background-color:red;color:white;">"\\\\flag"</span> + <span style="background-color:red;color:white;">"!!!reset!!!"</span>', literalCount: 2 },

            { fragment: '<span style="background-color:red;color:white;">"alpha"</span> + <span style="background-color:red;color:white;">"beta"</span> + <span style="background-color:red;color:white;">"____gamma__________"</span>', literalCount: 3 },
            { fragment: '<span style="background-color:red;color:white;">"1234"</span> + <span style="background-color:red;color:white;">"4567"</span> + <span style="background-color:red;color:white;">"78910_padding_______"</span>', literalCount: 3 },
            { fragment: '<span style="background-color:red;color:white;">"!!"</span> + <span style="background-color:red;color:white;">"__"</span> + <span style="background-color:red;color:white;">"##__END_FRAGMENT____////"</span>', literalCount: 3 },
            { fragment: '<span style="background-color:red;color:white;">"err"</span> + codeLevel + <span style="background-color:red;color:white;">"msg"</span> + <span style="background-color:red;color:white;">"___end____"</span>', literalCount: 3 },
            { fragment: '<span style="background-color:red;color:white;">"pre"</span> + dataChunk + <span style="background-color:red;color:white;">"mid"</span> + Val + <span style="background-color:red;color:white;">"post"</span>', literalCount: 3 },

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
