export type InsightSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Insight = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  topic: string;
  serviceSlug: string;
  publishedAt: string;
  sections: InsightSection[];
  references: { title: string; url: string }[];
};

export const insights: Insight[] = [
  {
    slug: 'evaluate-synthetic-data-for-ai',
    title: 'How to Evaluate Synthetic Data for an AI Task',
    description:
      'A practical evaluation plan for synthetic datasets: define the use, test utility, inspect subgroup coverage, and assess privacy risk.',
    summary:
      'Synthetic data is useful only when it supports a defined task. Compare it with a real baseline, test downstream performance, inspect important subgroups, and evaluate privacy risk separately from utility.',
    topic: 'Synthetic data',
    serviceSlug: 'synthetic-data-generation',
    publishedAt: '2026-09-24',
    sections: [
      {
        heading: 'Start with the decision the data must support',
        paragraphs: [
          '“Realistic” is not a complete acceptance criterion. A dataset can look plausible in aggregate while missing the rare conditions that determine whether a model is useful. Before generation starts, write down the task, the intended population, the data fields the system uses, and the errors that matter in the workflow.',
          'Then decide how the synthetic data will be used: model training, software testing, scenario simulation, analytics development, or sharing with another team. Each use calls for different evidence. A dataset that works for interface tests may not be suitable for measuring model quality.',
        ],
      },
      {
        heading: 'Measure more than one-column similarity',
        paragraphs: [
          'Checking that each field has a similar average or category frequency is a useful first pass, but it does not show that relationships between fields were preserved. Review dependencies, ranges, missingness, time patterns, and combinations that are important to the task. Slice the results by relevant population groups and source systems so aggregate similarity does not hide a gap.',
          'For generated images, text, audio, or sensor data, statistical summaries alone are rarely enough. Add domain review and task-specific checks. Record which examples were reviewed, what the reviewers considered acceptable, and what limitations remain.',
        ],
        bullets: [
          'Compare distributions and relationships that influence model decisions.',
          'Inspect rare outcomes and important subgroups separately.',
          'Use realistic constraints and domain review for generated examples.',
        ],
      },
      {
        heading: 'Test utility with a clean evaluation design',
        paragraphs: [
          'If the goal is model development, compare a model trained with the synthetic dataset against a relevant baseline. Evaluate on held-out real data when it is available and appropriate. Keep that evaluation data out of the generation and tuning loop. Otherwise, the test can overstate how well the synthetic data generalizes.',
          'Choose measures that match the task and decision. Overall accuracy can conceal uneven error rates. For ranking, retrieval, forecasting, or detection, use the measures and thresholds stakeholders will use to decide whether the system is fit for purpose. Report uncertainty and failure examples alongside a single summary metric.',
        ],
      },
      {
        heading: 'Assess privacy separately',
        paragraphs: [
          'Synthetic does not mean anonymous. A generation method can memorize training records or reproduce distinctive combinations. Define a plausible privacy threat model, examine similarity to source records, and use additional privacy tests or formal guarantees where the risk requires them. The right assessment depends on what the source data contains, who will receive the output, and what they can combine it with.',
          'Document the generation method, source data constraints, utility results, privacy checks, and known failure modes. This record helps downstream users understand what the dataset can and cannot support.',
        ],
      },
      {
        heading: 'Make acceptance criteria explicit',
        paragraphs: [
          'A practical release decision records the intended use, minimum utility criteria, required subgroup coverage, privacy review, and named owner. If a criterion fails, the next step should be specific: revise the generator, add controlled examples, limit the use, or stop. That makes synthetic data a governed engineering input rather than an untested substitute for source data.',
        ],
      },
    ],
    references: [
      { title: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework' },
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
    ],
  },
  {
    slug: 'write-data-annotation-guidelines',
    title: 'Writing Data Annotation Guidelines That Reduce Disagreement',
    description:
      'Build annotation instructions around task units, decision rules, edge cases, abstention, pilot review, and versioned adjudication.',
    summary:
      'Annotation guidelines work when they make decisions repeatable. Define the unit, labels, boundaries, examples, uncertainty, and escalation path, then test the instructions on a representative pilot.',
    topic: 'Annotation',
    serviceSlug: 'data-annotation',
    publishedAt: '2026-09-27',
    sections: [
      {
        heading: 'Define one task in observable terms',
        paragraphs: [
          'Begin by stating what an annotator receives and what they must return. “Identify sentiment” leaves important questions unanswered: Is sentiment attached to the whole document or a span? Is neutral a label? Should annotators infer intent or mark only what the text says? Is outside knowledge allowed?',
          'A clear task names the annotation unit, available context, output format, allowed labels, and what to do when evidence is insufficient. These details help keep the task stable when examples become harder or the project grows.',
        ],
      },
      {
        heading: 'Turn label names into decision rules',
        paragraphs: [
          'For each label, describe the evidence required to apply it and the evidence that rules it out. Add positive examples, negative examples, and boundary cases. If labels can co-occur, explain which combinations are valid. If one label is a parent of another, show how the hierarchy should be applied.',
          'Use examples from the real task distribution. A polished example that every annotator finds easy is less useful than one that exposes a genuine ambiguity. Keep a short rationale for each difficult example so future reviewers can understand the rule rather than memorize a label.',
        ],
        bullets: [
          'State inclusion and exclusion criteria.',
          'Explain how to handle missing context, multiple labels, and borderline cases.',
          'Mark when annotators should abstain or request adjudication.',
        ],
      },
      {
        heading: 'Pilot independently before scaling',
        paragraphs: [
          'Ask multiple annotators to label a representative pilot without discussing each item first. Compare their decisions by category and example type. The purpose is not to chase one agreement score; it is to find rules that different people interpret differently and areas where the taxonomy does not fit the data.',
          'Agreement statistics depend on the task, label prevalence, and chosen metric. A single aggregate number can hide weak performance on a rare but consequential class. Combine quantitative measures with expert review of disagreements and a check that the reference labels match the intended use.',
        ],
      },
      {
        heading: 'Adjudicate and version the rules',
        paragraphs: [
          'Resolve disagreements through a documented review process. Capture the final rationale and update the guideline so the same issue is handled consistently later. If a label definition changes, record the version and identify which existing examples need to be reviewed again.',
          'Keep a small set of reviewed examples as a calibration set. Use it to check whether new annotators understand the rules and whether the task has changed. Periodically sample production work for quality review, especially after instructions, tools, or data sources change.',
        ],
      },
      {
        heading: 'Treat uncertainty as data',
        paragraphs: [
          'Forcing a confident label on an unclear example creates noise that is difficult to diagnose later. Give annotators an explicit path for uncertainty, such as an abstain option, an escalation queue, or a request for more context. Track how often and why those paths are used. Frequent uncertainty can indicate a guideline gap, poor source data, or a taxonomy that needs revision.',
        ],
      },
    ],
    references: [
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
    ],
  },
  {
    slug: 'data-quality-checks-for-machine-learning',
    title: 'Data Quality Checks for Machine Learning Pipelines',
    description:
      'A practical checklist for defining dataset expectations, validating schemas, tracking slices, and investigating production drift.',
    summary:
      'Reliable ML data checks start with explicit expectations. Validate schemas and business rules, profile important slices, compare training and serving inputs, and route anomalies to an owner.',
    topic: 'Data quality',
    serviceSlug: 'data-quality-assurance',
    publishedAt: '2026-09-30',
    sections: [
      {
        heading: 'Make “good data” specific to the use',
        paragraphs: [
          'A quality rule is useful only when it describes an expectation that matters. “No missing values” may be wrong when missingness is meaningful. A global freshness threshold may be fine for a monthly report but too slow for a live fraud workflow. Define the population, source, time window, and business consequence before choosing a threshold.',
          'For each important field, document its meaning, type, allowed values, source, transformation, and expected relationship to other fields. That creates a contract that can be checked at ingestion, transformation, training, and serving boundaries.',
        ],
      },
      {
        heading: 'Use layered checks',
        paragraphs: [
          'Start with deterministic checks for required columns, types, ranges, formats, uniqueness, and referential integrity. Add distribution checks for unexpected shifts in values or missingness. Then review semantic properties that require domain context, such as whether a date sequence is plausible or two fields agree with a business rule.',
          'TensorFlow Data Validation is one example of tooling that compares dataset statistics with a schema and can surface anomalies. The specific implementation matters less than defining the expectation, recording the result, and assigning someone to investigate failures.',
        ],
        bullets: [
          'Schema and type checks catch structural changes.',
          'Range and domain checks catch invalid values.',
          'Distribution and slice checks surface shifts that aggregate totals can hide.',
          'Lineage and version checks connect a model result to the data used to produce it.',
        ],
      },
      {
        heading: 'Inspect slices and time, not only totals',
        paragraphs: [
          'A stable average does not guarantee that every group remains represented. Break important measures down by source, time period, geography, device, or other context relevant to the model. Decide which slices need a minimum sample size and which changes should trigger review.',
          'For time-dependent data, compare current inputs with a sensible reference period and consider seasonality. A shift is a signal, not automatically a defect. The team should determine whether it reflects a source issue, a real-world change, or an expected seasonal pattern.',
        ],
      },
      {
        heading: 'Check the path from training to serving',
        paragraphs: [
          'Training and production can process the same concept differently. Differences in joins, defaults, transformations, or feature timing create training-serving skew. Log a suitable sample of serving inputs and compare it with the training representation where privacy and operational controls allow.',
          'Google’s machine learning guidance recommends measuring training-serving skew and planning for model iteration. A practical pipeline should record the data and code versions used, monitor relevant inputs, and make it possible to trace an alert back to its source.',
        ],
      },
      {
        heading: 'Give every alert an action',
        paragraphs: [
          'A failed check should say what was expected, what was observed, what data is affected, and who owns the next decision. Define whether the pipeline stops, quarantines the records, routes them for review, or proceeds with an explicit exception. Track recurring anomalies so teams can fix the upstream cause instead of repeatedly clearing the same alert.',
        ],
      },
    ],
    references: [
      { title: 'TensorFlow Data Validation guide', url: 'https://www.tensorflow.org/tfx/guide/tfdv' },
      { title: 'Google: Monitoring production ML systems', url: 'https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring' },
      { title: 'Google: Rules of Machine Learning', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml' },
    ],
  },
  {
    slug: 'move-ai-pilot-to-production',
    title: 'Moving an AI Pilot Into Production: A Data and Operations Checklist',
    description:
      'Plan an AI deployment around a measurable workflow, representative evaluation, human review, monitoring, and rollback criteria.',
    summary:
      'A working demo is one checkpoint. Production readiness also depends on representative evaluation, data and model controls, user workflows, monitoring, ownership, and a safe response when results change.',
    topic: 'AI implementation',
    serviceSlug: 'ai-solutions',
    publishedAt: '2026-10-03',
    sections: [
      {
        heading: 'Name the user and decision',
        paragraphs: [
          'Before expanding a pilot, define who uses the system, what decision it informs, and what happens when the model is wrong or unavailable. Identify the current baseline and choose a measure that reflects the workflow outcome. A model metric by itself may not explain whether the process improved or introduced new work.',
          'State the system’s boundaries. Describe which inputs it can handle, where it should abstain, which outputs require human review, and what the system must never decide on its own.',
        ],
      },
      {
        heading: 'Build an evaluation set for the real workflow',
        paragraphs: [
          'Use examples that represent expected production traffic, including difficult cases, rare conditions, and groups that could experience different error rates. Keep the evaluation set separate from development and prompt or model tuning. Review the reference labels themselves so the score is not treated as more certain than the evidence allows.',
          'Measure task quality alongside latency, cost, failure behavior, and human review load. If the system relies on retrieved information or upstream data, evaluate those parts too. Record limitations and the conditions under which the result is valid.',
        ],
      },
      {
        heading: 'Prepare data and operating controls',
        paragraphs: [
          'Document data sources, access permissions, transformations, retention rules, and quality checks. Keep a record of dataset and model versions so teams can reproduce and investigate results. Review how personal or sensitive information is handled before exposing data to a service or model.',
          'Plan release controls such as staged rollout, access restrictions, audit logs, fallback behavior, and rollback. Define who can change prompts, models, thresholds, or data mappings, and how those changes are reviewed.',
        ],
      },
      {
        heading: 'Monitor outcomes after launch',
        paragraphs: [
          'Production inputs and user behavior change. Monitor data quality, model output quality, system errors, latency, and human overrides. Set investigation thresholds based on impact and expected variation, and make sure alerts have owners and response steps.',
          'Google’s production ML guidance describes training-serving skew and the importance of monitoring pipelines. The NIST AI Risk Management Framework also provides a voluntary structure for identifying, assessing, and managing AI risks across the lifecycle.',
        ],
      },
      {
        heading: 'Decide what happens when evidence changes',
        paragraphs: [
          'Set review points for material changes in data, model behavior, user impact, vendor terms, or operating context. Decide when to retrain, re-evaluate, constrain, roll back, or retire the system. Production readiness is an ongoing operating process, not a one-time approval.',
        ],
      },
    ],
    references: [
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
      { title: 'Google: Production ML systems monitoring', url: 'https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring' },
      { title: 'Google: Rules of Machine Learning', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml' },
    ],
  },
  {
    slug: 'evaluate-retrieval-augmented-generation-systems',
    title: 'How to Evaluate a Retrieval-Augmented Generation System',
    description:
      'A practical evaluation plan for RAG systems: test retrieval, grounding, answer quality, failure handling, and changes over time.',
    summary:
      'A useful RAG evaluation separates retrieval quality from answer quality. Build representative questions, inspect retrieved evidence, score grounded answers, and test abstention and operational behavior before release.',
    topic: 'AI evaluation',
    serviceSlug: 'ai-solutions',
    publishedAt: '2026-10-06',
    sections: [
      {
        heading: 'Evaluate the pipeline in parts',
        paragraphs: [
          'A generated answer can be wrong because the relevant source was not retrieved, because the model misread the source, or because the system assembled an answer that the evidence does not support. A single end-to-end score makes these failure causes difficult to distinguish. Review retrieval and generation separately, then measure the combined experience.',
          'For each test question, keep the expected answer, the supporting source passages, and the intended behavior when the knowledge base has no adequate evidence. This makes it possible to audit why a response passed or failed rather than treating the final text as a black box.',
        ],
      },
      {
        heading: 'Build a representative test set',
        paragraphs: [
          'Collect questions from the real workflow and include paraphrases, ambiguous requests, multi-step questions, outdated information, and questions with no supported answer. Add examples from each important document type and user group. Remove sensitive content that is not needed for testing and control access to the examples that remain.',
          'Keep a stable holdout set out of prompt and retrieval tuning. When the corpus or product changes, add new cases without silently replacing difficult old cases. Record which corpus version and system configuration produced each evaluation result.',
        ],
        bullets: [
          'Measure whether the retrieved passages contain the evidence needed to answer.',
          'Check answer correctness and whether each material claim is supported by retrieved evidence.',
          'Test citation accuracy, refusal behavior, and the response when sources conflict.',
        ],
      },
      {
        heading: 'Review failures with evidence',
        paragraphs: [
          'For every failed case, inspect the query, retrieved passages, final answer, and source citation together. A retrieval miss may call for better chunking, metadata, or query handling. An unsupported answer may require stronger grounding instructions, a narrower response format, or a clearer abstention rule. Avoid changing several components at once without recording what changed.',
          'Use human review to calibrate automated graders and investigate disagreements. Automated measures are useful for repeatable comparisons, but they can miss domain-specific errors or reward fluent answers that do not satisfy the task.',
        ],
      },
      {
        heading: 'Test operating conditions, not just quality',
        paragraphs: [
          'Measure response time, cost, error rates, and behavior under missing or unavailable sources. Check that access controls apply to retrieved documents and that the system does not expose content to users who should not see it. Define what the product does when retrieval times out or a source is removed.',
          'Re-run the evaluation after changes to the embedding model, index, corpus, prompt, model, or access policy. Compare by question type and important data slice, not only by an overall average. Keep a release record with the test set version, configuration, findings, and unresolved limitations.',
        ],
      },
      {
        heading: 'Set release gates before tuning',
        paragraphs: [
          'Choose acceptance criteria that reflect the consequences of mistakes. A low-risk internal search helper may need different controls from a system that supports regulated or safety-critical work. Specify minimum retrieval coverage, answer support, citation accuracy, abstention behavior, and operational limits before reviewing results.',
          'If a release gate fails, narrow the supported use, improve the weak stage, or hold deployment. Documenting that decision helps teams distinguish a measured system from a persuasive demo.',
        ],
      },
    ],
    references: [
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
      { title: 'NIST AI RMF Playbook', url: 'https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook' },
    ],
  },
  {
    slug: 'build-a-data-quality-release-gate',
    title: 'Building a Data Quality Release Gate for AI Projects',
    description:
      'Design an actionable data quality gate for AI releases with representative checks, thresholds, ownership, and exception handling.',
    summary:
      'A useful release gate turns data expectations into repeatable checks and clear decisions. Define what must pass, what can be reviewed, who owns exceptions, and how each result is tied to a dataset version.',
    topic: 'Data quality',
    serviceSlug: 'data-quality-assurance',
    publishedAt: '2026-10-09',
    sections: [
      {
        heading: 'Tie every check to a risk or requirement',
        paragraphs: [
          'A long checklist can create noise if no one knows why a check exists. For each rule, state the expected condition, the failure it is meant to catch, and what decision follows. Examples include required fields, valid categories, acceptable freshness, duplicate limits, or minimum coverage for an important case.',
          'Set thresholds with the people who own the workflow. A missing value may be acceptable for one field and a release blocker for another. A shift may signal a source problem, or it may reflect a genuine change in the population. The gate should make that distinction reviewable.',
        ],
      },
      {
        heading: 'Combine structural and task-level checks',
        paragraphs: [
          'Start with deterministic validation of schema, types, ranges, required fields, uniqueness, and relationships. Add distribution and slice checks so aggregate totals do not hide gaps in a small but important group. For labeled data, sample examples and review label consistency, guideline edge cases, and unresolved disagreement.',
          'Keep the checks close to the data handoff where failures can be traced to their source. Store the rule version and result with the dataset version so later model evaluation can be connected to the exact inputs that passed the gate.',
        ],
        bullets: [
          'Separate hard blockers from warnings that require a named reviewer.',
          'Include sample-based human review for properties that code cannot judge reliably.',
          'Record coverage and known exclusions along with pass or fail status.',
        ],
      },
      {
        heading: 'Make exceptions explicit and temporary',
        paragraphs: [
          'A release process needs a safe path for a justified exception, but an undocumented override weakens the gate. Record the failing rule, affected data, reason for proceeding, approver, expiration or review date, and compensating control. Do not convert a one-time exception into a silent permanent threshold change.',
          'When a check fails, the pipeline should give a useful explanation: expected value, observed value, affected records or slices, and an owner for the next step. Decide in advance whether the data is blocked, quarantined, sent for review, or accepted under an exception.',
        ],
      },
      {
        heading: 'Measure whether the gate helps',
        paragraphs: [
          'Track which checks catch real issues, which produce avoidable alerts, and how long reviews take. If a threshold repeatedly triggers without changing a decision, refine it with the data owner. If a failure reaches production, add a check only after identifying a measurable signal that would have caught it earlier.',
          'Revisit the gate when the use case, source system, population, labeling rules, or model workflow changes. A data contract is useful when it evolves with the system and its owners understand the consequences of each rule.',
        ],
      },
    ],
    references: [
      { title: 'TensorFlow Data Validation guide', url: 'https://www.tensorflow.org/tfx/guide/tfdv' },
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
    ],
  },
  {
    slug: 'sampling-plan-for-annotation-quality',
    title: 'A Practical Sampling Plan for Annotation Quality',
    description:
      'Plan annotation quality reviews with representative samples, risk-based coverage, adjudication, and clear escalation rules.',
    summary:
      'A useful annotation audit samples work across annotators, labels, sources, and difficult cases. Use the findings to fix instructions and workflow causes, not only to report one aggregate score.',
    topic: 'Annotation quality',
    serviceSlug: 'data-annotation',
    publishedAt: '2026-10-12',
    sections: [
      { heading: 'Define what the audit must detect', paragraphs: [
        'Start with the errors that could change a model or business decision. A review intended to catch inconsistent boundaries may need different examples from one intended to detect missed rare labels. Write down the unit being reviewed, the reference decision, and the action that follows a disagreement.',
        'Keep separate measures for label accuracy, completeness, guideline adherence, and unresolved ambiguity. Combining them into one score can hide whether a dataset needs better instructions, more reviewer training, or a revised taxonomy.',
      ]},
      { heading: 'Sample across sources of variation', paragraphs: [
        'A purely random sample is a useful baseline, but may contain too few examples from rare labels or new data sources. Combine a representative random sample with targeted review of high-risk categories, newly onboarded annotators, edge cases, and examples changed after adjudication.',
        'Document the sampling frame and selection method. If results are reported as a rate, state the sample size and how the sample was selected. A targeted sample is good for finding issues, but should not be presented as an unbiased estimate of the full dataset without a suitable design.',
      ], bullets: ['Review across annotators and production batches.', 'Include difficult and low-frequency labels.', 'Keep targeted risk samples distinct from representative samples.']},
      { heading: 'Turn findings into process changes', paragraphs: [
        'For each disagreement, record its cause: unclear guidance, missing context, tool behavior, a source-data defect, or an annotator mistake. Update the relevant rule and examples, then check whether the same issue appears in earlier work that may need review.',
        'Set review frequency according to risk and observed stability. Increase sampling after a taxonomy or source change, and reduce it only when evidence shows the process is stable. Preserve a calibration set so new reviewers can be checked against the same documented decisions.',
      ]},
    ],
    references: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' }],
  },
  {
    slug: 'dataset-lineage-for-machine-learning',
    title: 'Dataset Lineage: What to Record for Every AI Release',
    description:
      'A practical dataset lineage checklist connecting source data, transformations, labels, evaluation, and deployed model versions.',
    summary:
      'When a model result changes, teams need to reconstruct which data and transformations produced it. A compact lineage record links source versions, processing steps, label rules, evaluation results, and release decisions.',
    topic: 'Data governance',
    serviceSlug: 'data-quality-assurance',
    publishedAt: '2026-10-15',
    sections: [
      { heading: 'Record identity and intended use', paragraphs: [
        'Give each dataset release a stable identifier and describe its intended task, population, time period, and known exclusions. Record the owner and approved use so downstream teams do not infer permission or suitability from a filename.',
        'A dataset card or equivalent record should make assumptions and limitations easy to find. The format can be lightweight, but it should be maintained alongside the data and point to the exact release it describes.',
      ]},
      { heading: 'Connect sources to transformations', paragraphs: [
        'Capture source system versions, ingestion dates, filters, joins, deduplication, normalization, and other material transformations. Link the code or pipeline version and store the checks that ran at each handoff. This helps distinguish a source change from a processing change.',
        'For labeled data, include the guideline version, annotator or reviewer workflow identifiers where appropriate, adjudication decisions, and any relabeling history. Apply access controls to records that could identify workers or contain sensitive examples.',
      ], bullets: ['Dataset release ID and time window.', 'Source and transformation versions.', 'Schema and quality-check results.', 'Label guideline version and review history.', 'Evaluation-set links and model release association.']},
      { heading: 'Make lineage useful during an incident', paragraphs: [
        'A lineage record should support concrete questions: Which releases contain the affected source? Which model versions used them? Can the issue be reproduced? What downstream evaluations must be rerun? Test these questions during normal release reviews rather than waiting for an incident.',
        'Do not retain raw data indefinitely just to preserve traceability. Keep metadata and reproducibility artifacts consistent with privacy, retention, and security requirements. The correct record is the minimum information needed to understand and govern the release.',
      ]},
    ],
    references: [
      { title: 'NIST AI Risk Management Framework Playbook', url: 'https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook' },
      { title: 'Google ML: Data preparation and feature engineering', url: 'https://developers.google.com/machine-learning/data-prep' },
    ],
  },
  {
    slug: 'detect-data-drift-without-overreacting',
    title: 'Detecting Data Drift Without Overreacting to Normal Change',
    description:
      'Separate meaningful data drift from expected variation with baselines, context, slice checks, and a documented response process.',
    summary:
      'A distribution change is a prompt to investigate, not proof that a model has failed. Compare inputs with a relevant baseline, examine important slices, and connect alerts to measurable decisions and owners.',
    topic: 'Production AI',
    serviceSlug: 'ai-solutions',
    publishedAt: '2026-10-18',
    sections: [
      { heading: 'Choose a baseline that fits the data', paragraphs: [
        'The previous day may be a poor reference for a seasonal workflow, while a year-old baseline may hide a recent source change. Choose comparison windows that reflect the operating cycle and record the reason for the choice. Check both data freshness and completeness before interpreting a shift.',
        'Monitor features that matter to the model and decision. A dashboard of every column can generate noise; a small set of justified signals is easier to review and maintain.',
      ]},
      { heading: 'Interpret shifts by slice and impact', paragraphs: [
        'A stable overall distribution can hide a change in a subgroup, source, device, or region. Break out the slices that relate to known risks and verify that each has enough observations for the comparison to be meaningful.',
        'Input drift does not automatically mean performance has degraded. Where reliable outcomes become available, compare model errors and workflow results as well. If outcomes are delayed, treat input shifts as investigation signals and state that limitation clearly.',
      ]},
      { heading: 'Give alerts an operational response', paragraphs: [
        'For each alert, specify the threshold, owner, triage steps, and possible actions. The response might be to repair an upstream feed, collect labels, restrict a use, or take no action after confirming expected seasonality. Avoid automatic retraining based on a drift score alone.',
        'Keep examples and notes from reviewed alerts. Use them to tune thresholds and preserve a record of why the team proceeded, constrained the system, or rolled back a change.',
      ]},
    ],
    references: [{ title: 'Google ML: Monitoring production ML systems', url: 'https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring' }],
  },
  {
    slug: 'design-a-robust-ai-evaluation-set',
    title: 'Designing an Evaluation Set That Reflects Real AI Use',
    description:
      'Build an AI evaluation set with representative cases, risk-based coverage, stable labels, protected holdouts, and useful error analysis.',
    summary:
      'An evaluation set should represent the decisions a system will face, including difficult and unsupported cases. Protect the holdout, review the reference labels, and report performance by meaningful slices.',
    topic: 'AI evaluation',
    serviceSlug: 'data-annotation',
    publishedAt: '2026-10-21',
    sections: [
      { heading: 'Sample from the intended workflow', paragraphs: [
        'Define the users, inputs, context, and decisions the system will support. Draw examples from the expected sources and include variation in wording, format, quality, and difficulty. If production data cannot be used, document how the replacement examples were constructed and what they fail to represent.',
        'Include unsupported requests and missing-context cases. A model that performs well only when the answer is present in the prompt may behave poorly when the real workflow is uncertain or incomplete.',
      ]},
      { heading: 'Protect the test from tuning leakage', paragraphs: [
        'Separate development examples from the final holdout and limit access to the holdout when teams are iterating. If examples repeatedly guide prompt or model changes, they have become development data and should not be treated as an untouched final test.',
        'Version the examples and reference labels. When a label changes, record why and which evaluation runs need to be repeated. Preserve prior results so a score change can be traced to a system change or a corrected reference.',
      ]},
      { heading: 'Report performance people can act on', paragraphs: [
        'Choose metrics that match the task and consequences of error. Include sample counts, uncertainty, and relevant slices. Review representative failures and explain what the aggregate score leaves out.',
        'Set release thresholds before looking at the final results. If a threshold fails, identify whether the gap is in the data, labeling, model, interface, or operating procedure. This makes evaluation a release decision aid rather than a marketing number.',
      ]},
    ],
    references: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' }],
  },
  {
    slug: 'privacy-checklist-for-ai-datasets',
    title: 'A Privacy Checklist Before Sharing an AI Dataset',
    description:
      'Review purpose, identifiability, access, retention, and residual risks before sharing datasets for AI development or evaluation.',
    summary:
      'Removing direct identifiers does not by itself make a dataset safe to share. Match privacy controls to the data, recipients, purpose, and plausible ways records could be linked or misused.',
    topic: 'Data governance',
    serviceSlug: 'data-quality-assurance',
    publishedAt: '2026-10-24',
    sections: [
      { heading: 'Define the sharing purpose and audience', paragraphs: [
        'Write down what the recipient needs to do, which fields are necessary, how long access is needed, and whether the data can be combined with other sources. Limit the share to that purpose and audience, and confirm the appropriate legal and organizational basis with the responsible privacy team.',
        'Classify direct identifiers, quasi-identifiers, sensitive attributes, free text, and derived fields. Data that appears harmless in isolation may become identifying when combined with location, time, or external records.',
      ]},
      { heading: 'Reduce exposure and control access', paragraphs: [
        'Remove fields that are not needed, generalize or transform others where appropriate, and consider whether a smaller sample or synthetic alternative can satisfy the task. Assess the residual risk after transformation rather than assuming that a method guarantees anonymity.',
        'Use least-privilege access, approved storage, encryption, logging, retention limits, and a clear deletion process. Specify whether onward sharing, copying, or model training is allowed and how that use will be checked.',
      ]},
      { heading: 'Review the release and its limits', paragraphs: [
        'Test the data for direct leakage and plausible linkage risks relevant to the recipient and context. For synthetic or masked datasets, consider whether records or distinctive patterns can still be linked to source individuals. Document the method, checks, known limits, owner, and approval.',
        'Privacy controls depend on jurisdiction, data type, and use. Bring qualified privacy and legal reviewers into decisions with material risk, and revisit the assessment if the audience, purpose, or data changes.',
      ]},
    ],
    references: [
      { title: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework' },
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
    ],
  },
  {
    slug: 'human-review-workflows-for-ai',
    title: 'Designing Human Review That Improves AI Operations',
    description:
      'Set up human review for AI outputs with clear decision rights, escalation, calibrated sampling, and feedback loops.',
    summary:
      'Human review helps only when reviewers have context, authority, and a clear way to handle uncertainty. Design the queue, escalation rules, and feedback loop around the actual decision and its risks.',
    topic: 'AI operations',
    serviceSlug: 'ai-solutions',
    publishedAt: '2026-10-27',
    sections: [
      { heading: 'Decide which cases need review', paragraphs: [
        'Route cases according to risk, uncertainty, and workflow requirements. A confidence score alone may be poorly calibrated or miss unfamiliar errors. Combine it with rule-based triggers, user reports, and periodic random review to detect failures the system does not flag itself.',
        'Define what reviewers can approve, edit, reject, or escalate. Make the consequence of each option visible and provide the evidence needed to decide, including source context and known limitations.',
      ]},
      { heading: 'Give reviewers usable instructions', paragraphs: [
        'Use concise criteria, examples, and an explicit “insufficient evidence” path. Train reviewers on borderline cases and periodically check agreement. If reviewers repeatedly disagree, examine the task and interface instead of treating the disagreement as individual failure.',
        'Track review volume, turnaround time, overrides, reasons for changes, and downstream outcomes where available. Protect reviewer information and avoid turning operational measurements into unsupported claims about individual performance.',
      ]},
      { heading: 'Close the loop safely', paragraphs: [
        'Feed reviewed examples into evaluation and guideline updates through a controlled process. Do not automatically treat every override as a correct label; investigate the evidence and adjudicate material disagreements. Version changes so teams can tell which behavior was reviewed under which rules.',
        'Monitor whether review catches the intended failures and whether workload is sustainable. Adjust routing when the system or the operating environment changes, and preserve an escalation path when a reviewer cannot resolve a case.',
      ]},
    ],
    references: [{ title: 'NIST AI Risk Management Framework Playbook', url: 'https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook' }],
  },
  {
    slug: 'model-release-monitoring-checklist',
    title: 'A Monitoring Checklist for AI Model Releases',
    description:
      'Monitor AI releases across data health, quality, reliability, user impact, and rollback readiness with named owners and thresholds.',
    summary:
      'A production monitoring plan combines technical health with model and workflow outcomes. Define signals, thresholds, owners, and safe responses before rollout, then review them as the system changes.',
    topic: 'Production AI',
    serviceSlug: 'ai-solutions',
    publishedAt: '2026-10-30',
    sections: [
      { heading: 'Monitor more than service uptime', paragraphs: [
        'Availability and latency show whether a service responds, not whether its output is useful. Track input quality, model quality when labels become available, task completion, user corrections, and important subgroup outcomes. Choose signals that reflect the system’s intended use.',
        'For each signal, specify its source, calculation, baseline, threshold, and owner. Include minimum volumes so teams do not overinterpret noisy rates from very small samples.',
      ]},
      { heading: 'Prepare release and rollback controls', paragraphs: [
        'Use a staged rollout where feasible and define the evidence required to expand exposure. Keep a known-good version available, document how to switch back, and check that the fallback path works under realistic conditions.',
        'Record the model, prompt, data, feature, and configuration versions associated with each release. This is essential when teams need to compare behavior or reproduce an incident.',
      ]},
      { heading: 'Make alerts lead to decisions', paragraphs: [
        'Every alert should tell the responder what changed, which users or cases may be affected, and what action is available. The playbook can include investigation, additional review, data quarantine, use restriction, rollback, or a documented decision to continue.',
        'Review alerts after incidents and false alarms. Update thresholds based on evidence and record changes. Reassess monitoring when the workflow, population, upstream data, model, or risk profile changes.',
      ]},
    ],
    references: [
      { title: 'Google ML: Monitoring production ML systems', url: 'https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring' },
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
    ],
  },
  {
    slug: 'create-a-data-contract-for-ml-pipelines',
    title: 'How to Create a Data Contract for an ML Pipeline',
    description: 'Define a practical data contract for machine learning with field meaning, quality rules, ownership, compatibility, and change handling.',
    summary: 'A data contract makes expectations visible between data producers and ML teams. Specify meaning, structure, quality, ownership, and what happens when an upstream source changes.',
    topic: 'Data quality',
    serviceSlug: 'data-quality-assurance',
    publishedAt: '2026-11-02',
    sections: [
      { heading: 'Describe the data in terms of the workflow', paragraphs: [
        'For each field, record its business meaning, type, unit, allowed values, source, and whether it can be absent. Clarify event time versus processing time, timezone assumptions, and how corrections or late-arriving records are represented.',
        'A schema alone cannot explain whether a field is suitable for a model. Include the intended population, known exclusions, privacy classification, and the decision the data supports.',
      ]},
      { heading: 'Make quality checks testable', paragraphs: [
        'Turn important expectations into checks for completeness, validity, freshness, uniqueness, relationships, and distribution. Name thresholds and owners. Distinguish a release blocker from a warning that needs human review.',
        'Use sample-based semantic checks for properties that cannot be reliably captured in code. Keep the sample selection and review rationale with the release record.',
      ], bullets: ['Version the contract with the pipeline.', 'Notify downstream owners before breaking changes.', 'Record exceptions with a reason, approver, and review date.']},
      { heading: 'Plan for change and failure', paragraphs: [
        'Define compatibility rules and a deprecation window for changes to field meaning, source, format, or availability. Decide whether a failed check blocks processing, quarantines affected records, or allows a documented exception.',
        'Review contracts when the workflow, population, or model use changes. A contract is valuable when the people who produce and consume the data can maintain it and act on its results.',
      ]},
    ],
    references: [{ title: 'TensorFlow Data Validation guide', url: 'https://www.tensorflow.org/tfx/guide/tfdv' }],
  },
  {
    slug: 'build-a-review-loop-for-data-labeling',
    title: 'Building a Review Loop for Data Labeling Teams',
    description: 'Connect annotation audits, adjudication, guideline updates, and reviewer calibration in a repeatable quality loop.',
    summary: 'A labeling quality loop turns disagreements into clearer rules and more consistent future work. Make review outcomes traceable, calibrate against shared examples, and check whether fixes reduce recurring errors.',
    topic: 'Annotation',
    serviceSlug: 'data-annotation',
    publishedAt: '2026-11-06',
    sections: [
      { heading: 'Capture the disagreement, not only the score', paragraphs: [
        'When reviewers disagree, preserve the item, decisions, guideline version, and final rationale. Categorize the issue as unclear guidance, missing context, tool behavior, source quality, or an annotator error. This helps the team choose the right correction.',
        'Keep a small, reviewed calibration set with examples that represent routine and difficult cases. Use it when onboarding annotators or after a material guideline change.',
      ]},
      { heading: 'Adjudicate with consistent decision rights', paragraphs: [
        'Specify who can resolve a disagreement, when a subject-matter expert is needed, and when an item should remain uncertain or be excluded. Adjudicators should apply the documented task criteria rather than introduce private interpretations.',
        'If adjudication changes a rule, version the update and identify whether earlier items should be rechecked. Communicate the change before the next batch begins.',
      ], bullets: ['Track issue type and frequency.', 'Re-review examples affected by rule changes.', 'Keep abstention and escalation available for insufficient evidence.']},
      { heading: 'Measure whether the loop is working', paragraphs: [
        'Review disagreement patterns, quality samples, turnaround time, and repeated corrections by task type. Do not rely on a single agreement number: class prevalence and sample design can influence what it appears to show.',
        'After a process change, sample new work to see whether the specific issue declined without causing new errors. Retire checks that no longer inform a decision and add checks when a measurable failure mode appears.',
      ]},
    ],
    references: [{ title: 'NIST AI Risk Management Framework Playbook', url: 'https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook' }],
  },
  {
    slug: 'choose-between-real-and-synthetic-training-data',
    title: 'Choosing Between Real and Synthetic Training Data',
    description: 'Compare real and synthetic data for an AI task by coverage, label quality, privacy, utility, and operational constraints.',
    summary: 'The choice depends on the task and evidence available. Compare candidate data on representative held-out examples, examine subgroup coverage, and assess privacy and provenance as separate requirements.',
    topic: 'Synthetic data',
    serviceSlug: 'synthetic-data-generation',
    publishedAt: '2026-11-10',
    sections: [
      { heading: 'Start from the data gap', paragraphs: [
        'Identify whether the problem is insufficient volume, rare scenarios, expensive labeling, restricted access, or missing edge cases. Synthetic examples may help with some gaps, but they do not automatically reproduce the real task distribution or correct missing domain knowledge.',
        'Document what real data represents and what it excludes. Compare the intended population, source conditions, label process, and time period before deciding which data is suitable.',
      ]},
      { heading: 'Compare utility with held-out real examples', paragraphs: [
        'Train or evaluate under a controlled design and measure performance on a held-out set that reflects the intended use. Keep the evaluation data out of generation and tuning. Inspect failures by important slice and example type.',
        'If reliable real evaluation examples are unavailable, be explicit about that limit. Similarity checks or expert review can provide useful evidence, but neither alone proves downstream performance.',
      ]},
      { heading: 'Assess privacy and provenance separately', paragraphs: [
        'For real data, verify approved purpose, access, retention, and handling. For synthetic data, examine whether records or distinctive patterns could reveal source information and document the generation process. The word synthetic does not itself establish anonymity.',
        'A practical decision records the source, intended use, evaluation results, privacy review, known limitations, and owner. Revisit the choice when the task or data changes.',
      ]},
    ],
    references: [
      { title: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework' },
      { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
    ],
  },
  {
    slug: 'prepare-multimodal-data-for-ai-training',
    title: 'Preparing Image, Audio, and Text Data for AI Training',
    description: 'A multimodal data preparation checklist for provenance, metadata, quality review, alignment, and representative evaluation.',
    summary: 'Multimodal datasets need modality-specific checks plus shared controls for provenance, consent, labels, and versioning. Validate alignment and task relevance before scaling collection or annotation.',
    topic: 'AI data preparation',
    serviceSlug: 'data-annotation',
    publishedAt: '2026-11-16',
    sections: [
      { heading: 'Preserve source context and provenance', paragraphs: [
        'Record where each asset came from, when it was captured or created, applicable usage restrictions, and how it was transformed. Preserve links between an asset and its labels without exposing unnecessary personal information.',
        'Keep metadata such as language, duration, resolution, device, or collection context when it is relevant to the task. Document missing or unreliable metadata so downstream users do not treat it as ground truth.',
      ]},
      { heading: 'Check quality by modality', paragraphs: [
        'For images, inspect resolution, corruption, duplicates, and meaningful variation. For audio, examine clipping, silence, channel issues, and transcript alignment. For text, review encoding, truncation, formatting artifacts, and language identification.',
        'Automated checks can flag patterns, but representative human review remains useful for semantic quality. Use a rubric and sample across sources, classes, and difficult cases.',
      ], bullets: ['Verify paired text and media refer to the same example.', 'Keep label and transcript versions traceable to source assets.', 'Review rare and high-impact cases separately.']},
      { heading: 'Evaluate the data in the intended task', paragraphs: [
        'Check whether examples cover the conditions the model will encounter and whether labels reflect the operational definition. Evaluate on a protected holdout with realistic variation and report performance by important slice.',
        'Define retention, access, and deletion rules for raw media and derived files. The appropriate controls depend on content, purpose, and jurisdiction; involve the relevant privacy and security owners when the data requires it.',
      ]},
    ],
    references: [{ title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' }],
  },
  {
    slug: 'operationalize-ai-data-quality-metrics',
    title: 'Turning AI Data Quality Metrics Into Operational Decisions',
    description: 'Connect data quality measures to release gates, owners, escalation paths, and measurable follow-up actions.',
    summary: 'A metric is operational only when teams know what it means, when it matters, and what action follows. Tie each measure to a use case, owner, threshold, and response path.',
    topic: 'Data operations',
    serviceSlug: 'data-quality-assurance',
    publishedAt: '2026-11-23',
    sections: [
      { heading: 'Choose measures that answer a decision', paragraphs: [
        'For each metric, state the question it answers. Completeness may tell a team whether a source is usable; label disagreement may indicate a guideline problem; coverage may identify a gap in a critical case. Avoid collecting scores that do not change a decision or trigger useful investigation.',
        'Document the population, calculation, time window, and limitations. If a score depends on sampling, include the method and sample size so readers can interpret it correctly.',
      ]},
      { heading: 'Set thresholds with owners', paragraphs: [
        'Thresholds should reflect the workflow and cost of failure. Define who reviews a warning, who can approve an exception, and what blocks a release. Include an expiration or review date for exceptions so they do not become permanent by default.',
        'Keep source quality, label quality, model quality, and workflow outcome measures distinct. Combining them can obscure where the problem originates.',
      ]},
      { heading: 'Create a feedback and improvement loop', paragraphs: [
        'For each alert, record the observed issue, affected data, response, and resolution. Review recurring alerts to identify upstream causes and remove noisy checks. When a change is made, verify whether the intended failure rate or decision improved.',
        'Share a concise release record with downstream users: what passed, what needs review, what is excluded, and who owns follow-up. That turns quality measurement into a routine operating practice.',
      ]},
    ],
    references: [{ title: 'TensorFlow Data Validation guide', url: 'https://www.tensorflow.org/tfx/guide/tfdv' }],
  },
];

export const insightBySlug = Object.fromEntries(insights.map((insight) => [insight.slug, insight])) as Record<string, Insight>;
