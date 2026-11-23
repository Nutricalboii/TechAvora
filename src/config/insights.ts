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
    publishedAt: '2026-11-08',
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
    publishedAt: '2026-11-08',
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
    publishedAt: '2026-11-08',
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
    publishedAt: '2026-11-08',
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
    publishedAt: '2026-11-23',
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
    publishedAt: '2026-11-23',
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
];

export const insightBySlug = Object.fromEntries(insights.map((insight) => [insight.slug, insight])) as Record<string, Insight>;
